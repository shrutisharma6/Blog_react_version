class Articles <ApplicationRecord
    belongs_to :user
    validates :title, presence: true
    validates :description, presence: true, length: {minimum:5, maximum: 100}
    
end