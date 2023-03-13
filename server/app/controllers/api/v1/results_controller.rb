class Api::V1::ResultsController < ApplicationController
def index
  if params[:id].nil? then render status: :bad_request end
  results = Result.all.where(user_id: 2)  

  if results
    render json: { status: "SUCCESS", message: "Fetched all results", data: results }, status: :ok
  else
    render json: results.errors, status: :bad_request
  end
end
end
