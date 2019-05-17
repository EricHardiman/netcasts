# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_04_16_222645) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "ads", force: :cascade do |t|
    t.string "start_time"
    t.string "stop_time"
    t.string "text"
    t.string "company"
    t.string "company_url"
    t.string "promo_code"
    t.bigint "episode_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["episode_id"], name: "index_ads_on_episode_id"
  end

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "clips", force: :cascade do |t|
    t.integer "start_time"
    t.integer "stop_time"
    t.bigint "episode_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["episode_id"], name: "index_clips_on_episode_id"
  end

  create_table "comments", force: :cascade do |t|
    t.string "content"
    t.bigint "user_id"
    t.bigint "episode_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["episode_id"], name: "index_comments_on_episode_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "episodes", force: :cascade do |t|
    t.string "title"
    t.text "content"
    t.integer "enclosure_length"
    t.string "enclosure_type"
    t.string "enclosure_url"
    t.datetime "pubdate"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "guid"
    t.integer "duration"
    t.string "explicit"
    t.bigint "podcast_id"
    t.index ["podcast_id"], name: "index_episodes_on_podcast_id"
  end

  create_table "podcast_categories", force: :cascade do |t|
    t.bigint "podcast_id"
    t.bigint "category_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_podcast_categories_on_category_id"
    t.index ["podcast_id"], name: "index_podcast_categories_on_podcast_id"
  end

  create_table "podcasts", force: :cascade do |t|
    t.string "title"
    t.string "copyright"
    t.string "description"
    t.string "docs"
    t.string "feed_url"
    t.string "image_url"
    t.string "language"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "author"
    t.string "explicit"
  end

  create_table "user_ads", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "ad_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["ad_id"], name: "index_user_ads_on_ad_id"
    t.index ["user_id"], name: "index_user_ads_on_user_id"
  end

  create_table "user_clips", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "clip_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["clip_id"], name: "index_user_clips_on_clip_id"
    t.index ["user_id"], name: "index_user_clips_on_user_id"
  end

  create_table "user_podcast", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "podcast_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["podcast_id"], name: "index_user_podcast_on_podcast_id"
    t.index ["user_id"], name: "index_user_podcast_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "ads", "episodes"
  add_foreign_key "clips", "episodes"
  add_foreign_key "comments", "episodes"
  add_foreign_key "comments", "users"
  add_foreign_key "podcast_categories", "categories"
  add_foreign_key "podcast_categories", "podcasts"
  add_foreign_key "user_ads", "ads"
  add_foreign_key "user_ads", "users"
  add_foreign_key "user_clips", "clips"
  add_foreign_key "user_clips", "users"
  add_foreign_key "user_podcast", "podcasts"
  add_foreign_key "user_podcast", "users"
end
