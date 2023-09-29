class FriendRequestReminderJob
  include Sidekiq::Job

  def perform(user_id, friend_request_id)
    # Do something
    user = User.find(user_id)
    friend_request = FriendRequest.find(friend_request_id)
    if friend_request.status== false
      FriendRequestMailer.friend_request_reminder(user).deliver_now
    end
  end
end
