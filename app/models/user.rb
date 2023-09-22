class User <ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable
    has_many :articles, dependent: :destroy
    has_many :comments

    has_many :friendships, dependent: :destroy
    has_many :friends, through: :friendships

    has_many :sent_friend_requests, foreign_key: :sent_by_id, class_name: 'FriendRequest'
    has_many :received_friend_requests, foreign_key: :sent_to_id, class_name: 'FriendRequest'

    has_many :sent_messages, foreign_key: :sender_id, class_name: 'Message'
    has_many :received_messages, foreign_key: :receiver_id, class_name: 'Message'

    
    
    before_save { self.email=email.downcase}
    validates :username, presence:true,
                         uniqueness: { case_sensitive: false }, 
                         length: { minimum: 2, maximum: 25}
    EMAIL_REGEX =   /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
    validates :email, presence:true, 
                      uniqueness: { case_sensitive: false }, 
                      length: { maximum: 100 },
                      format: { with: EMAIL_REGEX }
    # has_secure_password
end