# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(current_user)
    # return unless current_user.present?
    # can [:read, :update], Article, user: current_user

    # return unless user.present?
    # can :read, Article do |article|
    #   article.user_id == user.id || user.friends.include?(article.user)
    # end

    return unless current_user.present?
    friends_ids= current_user.friends.pluck(:id)
    can :read , Article , user_id: [friends_ids, current_user.id].flatten
  end
end
