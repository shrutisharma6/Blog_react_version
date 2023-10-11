class User <ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable
    has_many :articles, dependent: :destroy
    has_many :comments, dependent: :destroy
    has_many :likes, dependent: :destroy

    has_many :friendships, dependent: :destroy
    has_many :friends, through: :friendships

    has_many :sent_friend_requests, foreign_key: :sent_by_id, class_name: 'FriendRequest', dependent: :destroy
    has_many :received_friend_requests, foreign_key: :sent_to_id, class_name: 'FriendRequest', dependent: :destroy

    has_many :sent_messages, foreign_key: :sender_id, class_name: 'Message', dependent: :destroy
    has_many :received_messages, foreign_key: :receiver_id, class_name: 'Message', dependent: :destroy

    
    
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

    def self.ransackable_attributes(auth_object = nil)
      ["admin", "confirmation_sent_at", "confirmation_token", "confirmed_at", "created_at", "email", "encrypted_password", "id", "remember_created_at", "reset_password_sent_at", "reset_password_token", "unconfirmed_email", "updated_at", "username"]
    end

    def self.ransackable_associations(auth_object = nil)
      ["articles", "comments", "friends", "friendships", "likes", "received_friend_requests", "received_messages", "sent_friend_requests", "sent_messages"]
    end

    

  
end