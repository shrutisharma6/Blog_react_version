class FriendRequestMailer < ActionMailer::Base
  default from: 'blogifytester@gmail.com'
    def friend_request_reminder(user)
      @user = user
  
      mail(to: @user.email, subject: 'Friend Request Reminder')
    end
end
  
