class User <ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
    has_many :articles, dependent: :destroy
    
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