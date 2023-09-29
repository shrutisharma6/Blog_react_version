class Article <ApplicationRecord
    belongs_to :user
    has_one_attached :image
    has_many :article_categories
    has_many :categories, through: :article_categories
    validates :title, presence: true
    validates :description, presence: true, length: {minimum:5, maximum: 100}
    has_many :comments, dependent: :destroy
    has_many :likes, dependent: :destroy

    def imageUrl
        if image.attached?
            Rails.application.routes.url_helpers.rails_blob_url(image, only_path: true)
        end
    end
    
end