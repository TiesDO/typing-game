class ResultsController < ApplicationController
  # WARN: Still needs proper input validation
  def index
    # check if the user is logged in
    user = get_token
    render json: { status: 'ERROR', message: 'no user token provided' }, status: '401' if user.nil?

    # check if an id is provided
    render json: { status: 'ERROR', message: 'no valid resource id provided' }, status: '400' if param[:id].nil?

    # locate the requested resource
    result = Result.where(id: params[:id])
    render json: { status: 'ERROR', message: 'no resource found' }, status: '404' if result.nil?

    # validate the access to the resource
    render json: { status: 'ERROR', message: 'access denied' }, status: '401' if result[0].user_id != user.id

    # return the result
    render json: { status: 'SUCCESS', message: 'Result found', data: result }
  end

  # TODO: Show the top 10 results
  def leaderboard; end

  # TODO: Add a new result
  def create; end
end
