# == Schema Information
#
# Table name: pages
#
#  id           :integer          not null, primary key
#  site_id      :integer
#  name         :string
#  description  :string
#  uri          :string
#  url          :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  content_type :integer
#  type         :text
#  enabled      :boolean
#  parent_id    :integer
#  position     :integer
#  content      :json
#  show_on_menu :boolean          default(TRUE)
#  page_version :integer          default(1)
#

class PageSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :url, :parent_id
end
