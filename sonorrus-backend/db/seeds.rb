Podcast.destroy_all
Episode.destroy_all
ActiveRecord::Base.connection.execute("ALTER SEQUENCE podcasts_id_seq RESTART;")
ActiveRecord::Base.connection.execute("ALTER SEQUENCE episodes_id_seq RESTART;")

def get_string_from_data(dataArr)
  dataArr.each do |foo|
    if foo.class == String
      return foo
    end
  end
end

def create_cat_and_join(category, podId)
  cat = Category.find_or_create_by(name: category)
  PodcastCategory.create(category_id: cat.id, podcast_id: podId)
end

itunesTop = HTTParty.get('https://rss.itunes.apple.com/api/v1/us/podcasts/top-podcasts/all/100/explicit.json')
itunesTop["feed"]["results"].each do |item|
  id = item["id"].to_i
  itunesLookup = HTTParty.get("https://itunes.apple.com/lookup?id=#{id}")
  responseFromLookup = Crack::JSON.parse(itunesLookup.parsed_response)
  responseFromLookup["results"].each do |item|
    rssUrl = item["feedUrl"]
    begin
      rssResponse = HTTParty.get(rssUrl)
    rescue
      begin
        rssUrl = item["feedUr l"].delete(" ")
        rssResponse = HTTParty.get(rssUrl)
      rescue
        rssUrl = item[" feedUrl"].delete(' ')
        rssResponse = HTTParty.get(rssUrl)
      end
    end
    if rssResponse["rss"]["channel"] != nil
      if rssResponse["rss"]["channel"]["title"] == "Shane And Friends"
        next
      end
      begin
        docArr = [rssResponse["rss"]["channel"]["link"][0], rssResponse["rss"]["channel"]["link"][0]["href"]]
      rescue
        docArr = [rssResponse["rss"]["channel"]["link"][1]["href"]]
      end
      begin
        feedUrlArr = [rssResponse["rss"]["channel"]["link"][1]["href"], rssResponse["rss"]["channel"]["link"][1], rssResponse["rss"]["channel"]["link"]]
      rescue
        feedUrlArr = [rssResponse["rss"]["channel"]["link"][0]["href"]]
      end
      begin
        imageArr = [rssResponse["rss"]["channel"]["image"][0]["href"], rssResponse["rss"]["channel"]["image"][0]["url"]]
      rescue
        imageArr = [rssResponse["rss"]["channel"]["image"]["href"].to_s]
      end
      title = rssResponse["rss"]["channel"]["title"]
      copyright = rssResponse["rss"]["channel"]["copyright"]
      content = rssResponse["rss"]["channel"]["description"]
      docs = get_string_from_data(docArr)
      feed_url = get_string_from_data(feedUrlArr)
      img = get_string_from_data(imageArr)
      language = rssResponse["rss"]["channel"]["language"]
      author = rssResponse["rss"]["channel"]["author"]
      explicit = rssResponse["rss"]["channel"]["explicit"]

      podcast = Podcast.create(title: title, copyright: copyright, description: content, docs: docs, feed_url: feed_url, image_url: img, language: language, author: author, explicit: explicit)
      begin
        rssResponse["rss"]["channel"]["category"].each do |item|
          category = item["text"]
          create_cat_and_join(category, podcast.id)
        end
      rescue
        category = rssResponse["rss"]["channel"]["category"]["text"]
        create_cat_and_join(category, podcast.id)
        rssResponse["rss"]["channel"]["category"].each do |item|
          category = item[1]["text"]
          create_cat_and_join(category, podcast.id)
        end
      end

      begin
        rssResponse["rss"]["channel"]["item"].each do |item|
          if item["title"].class == Array
            title = item["title"][1]
          else
            title = item["title"]
          end
          content = item["description"]
          begin
            length = item["enclosure"]["length"].to_i
          rescue
            length = 0
          end
          begin
            type = item["enclosure"]["type"]
          rescue
            type = "audio/mpeg"
          end
          begin
            url = item["enclosure"]["url"]
          rescue
            url = item["link"]
          end
          pubDate = item["pubDate"].to_datetime
          guid = item["guid"]["__content__"]
          duration = item["duration"].to_i
          begin
            explicit = item["explicit"]
          rescue
            explicit = "Unknown"
          end
          podId = podcast.id

          Episode.create(title: title, content: content, enclosure_length: length, enclosure_type: type, enclosure_url: url, pubdate: pubDate, guid: guid, duration: duration, explicit: explicit, podcast_id: podId )
        end
      rescue
        title = rssResponse["rss"]["channel"]["item"]["title"]
        content = rssResponse["rss"]["channel"]["item"]["summary"]
        length = rssResponse["rss"]["channel"]["item"]["enclosure"]["length"].to_i
        type = rssResponse["rss"]["channel"]["item"]["enclosure"]["type"]
        url = rssResponse["rss"]["channel"]["item"]["enclosure"]["url"]
        pubDate = rssResponse["rss"]["channel"]["item"]["pubDate"].to_datetime
        guid = rssResponse["rss"]["channel"]["item"]["guid"]["__content__"]
        duration = rssResponse["rss"]["channel"]["item"]["duration"].to_i
        explicit = rssResponse["rss"]["channel"]["explicit"]
        podId = podcast.id

        Episode.create(title: title, content: content, enclosure_length: length, enclosure_type: type, enclosure_url: url, pubdate: pubDate, guid: guid, duration: duration, explicit: explicit, podcast_id: podId )
      end
    else
      response = Crack::XML.parse(rssResponse)
      podcast = Podcast.create(title: response["rss"]["channel"]["title"], copyright: response["rss"]["channel"]["copyright"], description: response["rss"]["channel"]["description"], docs: response["rss"]["channel"]["link"], feed_url: response["rss"]["channel"]["itunes:new_feed_url"], image_url: response["rss"]["channel"]["image"]["url"], language: response["rss"]["channel"]["language"], author: response["rss"]["channel"]["itunes:author"], explicit: response["rss"]["channel"]["itunes:explicit"])

      begin
        response["rss"]["channel"]["category"].each do |item|
          category = item["text"]
          create_cat_and_join(category, podcast.id)
        end
      rescue
        begin
          response["rss"]["channel"]["itunes:category"].each do |item|
            category =  item["text"]
            create_cat_and_join(category, podcast.id)
          end
        rescue
          category =  response["rss"]["channel"]["itunes:category"]["text"]
          create_cat_and_join(category, podcast.id)
        end
      end
      response["rss"]["channel"]["item"].each do |item|
        title = item["title"]
        content = item["description"]
        begin
          length = item["enclosure"]["length"].to_i
          type = item["enclosure"]["type"]
          url = item["enclosure"]["url"]
        rescue
          length = 0
          type = "audio/mpeg"
          url = "No MP3 Found"
        end
        pubdate = item["pubDate"].to_datetime
        guid = item["guid"]
        duration = item["itunes:duration"].to_i
        explicit = item["itunes:explicit"]
        Episode.create(title: title, content: content, enclosure_length: length, enclosure_type: type, enclosure_url: url, pubdate: pubdate, guid: guid, duration: duration, explicit: explicit, podcast_id: podcast.id)
      end
    end
  end
end

tal = Podcast.find_by("This American Life")
tal.image_url = "https://media.npr.org/images/podcasts/primary/icon_381444650-04c1bad8586e69edf04b78ea319846614c4a6a6b-s700-c85.png"
tal.save