module Api
    module V1
        class MessagesController < ApplicationController
            before_action :authenticate_user_custom,only: [:create]

            def create
                @sender=User.find(params[:user][:user_id])
                @receiver=User.find(params[:user_id])
                @message= Message.new(sender_id: @sender.id, receiver_id: @receiver.id, content: params[:message][:content])
                if @message.save
                    render json:{ message: 'Message sent successfully.' }
                else
                    render json: { message: 'Failed to send message'}
                end
            end

            def show 
                @sender = User.find(params[:id])
                @receiver = User.find(params[:user_id])
                @messages = Message.where(sender_id: @sender.id, receiver_id: @receiver.id).or(Message.where(sender_id: @receiver.id, receiver_id: @sender.id))
                render json: MessageSerializer.new(@messages).serializable_hash
              end 
              
        end
    end
end