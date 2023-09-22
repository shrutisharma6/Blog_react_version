module Api
    module V1
        class FriendRequestsController <ApplicationController
          before_action :authenticate_user_custom, only: [:send_friend_request, :reject_friend_request, :destroy]
            def send_friend_request
                friend = User.find(params[:friend_id])
                friend_request = FriendRequest.new(sent_by: @current_user, sent_to: friend, status: false)
                if friend_request.save
                  render json: { message: 'Friend request sent successfully.' }
                else
                  render json: { error: 'Friend request could not be sent.' }, status: :unprocessable_entity
                end
            end

            def reject_friend_request
              friend = User.find(params[:id])
              friend_request= FriendRequest.find_by(sent_by: friend.id, sent_to:@current_user.id)
              if friend_request
                friend_request.destroy
                render json: { message: 'Friend request rejected.' }
              else
                render json: { error: 'Friend request not found.' }, status: :not_found
              end
            end

            def received_friend_requests
              current_user= User.find(params[:id])
              friend_requests=current_user.received_friend_requests
              sender_ids = friend_requests.select { |request| request.status == false }.map { |request| request.sent_by_id }
              senders=User.find(sender_ids)
              render json: UserSerializer.new(senders).serializable_hash
            end

            def sent_friend_requests
              current_user= User.find(params[:id])
              sent_requests= current_user.sent_friend_requests
              recievers_ids=sent_requests.select { |request| request.status == false }.map { |request| request.sent_to_id }
              render json: recievers_ids
            end
        end
    end
end 