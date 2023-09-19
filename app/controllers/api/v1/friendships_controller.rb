module Api
    module V1
        class FriendshipsController < ApplicationController
            before_action :authenticate_user_custom, only: [:create]
            def create
                    user=@current_user
                    friend=User.find(params[:user_id])
                    if user.friends.include?(friend)
                        render json: {message: 'Friendship already exists'}, status: :not_acceptable
                    else
                        friendship1 = user.friendships.build(friend_id: friend.id)
                        friendship2 = friend.friendships.build(friend_id: user.id)

                        if friendship1.save && friendship2.save
                            render json: {message: 'Friendship created successfully'}, status: :created
                            friend_request= FriendRequest.find_by(sent_by: friend.id, sent_to:user.id)
                            friend_request.status=true
                            friend_request.save
                        else
                            render json: {message: 'Friendship could not be saved'}, status: :not_acceptable
                        end
                    end
               
            end

            def destroy
                user = User.find(params[:id])
                friend=User.find(params[:user_id])
                friendship1 = Friendship.find_by(user_id: friend.id, friend_id: user.id)
                friendship2 = Friendship.find_by(user_id: user.id, friend_id: friend.id)
                friendship1.destroy
                friendship2.destroy
                render json: {message: 'Friendships deleted successfully'}
            end

        end
    end
end
