class ResultsController < ApplicationController
  # WARN: Still needs proper input validation
  def index
    # check if the user is logged in
    user = get_token
    if user.nil?
      return render json: {
        status: 'ERROR',
        message: 'no user token provided'
      }, status: '401'
    end

    # check if an id is provided
    if param[:id].nil?
      return render json: {
        status: 'ERROR',
        message: 'no valid resource id provided'
      }, status: '400'
    end

    # locate the requested resource
    result = Result.where(id: params[:id])
    if result.nil?
      return render json: {
        status: 'ERROR',
        message: 'no resource found'
      }, status: '404'
    end

    # validate the access to the resource
    if result[0].user_id != user.id
      return render json: {
        status: 'ERROR',
        message: 'access denied'
      }, status: '401'
    end

    # return the result
    render json: {
      status: 'SUCCESS',
      message: 'Result found',
      data: result
    }
  end

  # TODO: Show the top 10 results
  def leaderboard
    top = Result.all.order(cpm: :asc).limit(10)

    output = []
    top.each do |r|
      output.push({ cpm: r['cpm'],
                    wpm: r['wpm'],
                    time: r['timeElapsed'],
                    user_id: r['user_id'],
                    username: r.user.username
                  })
    end

    render json: { data: output }
  end

  def create
    user = get_token
    if user.nil?
      return render json: {
        status: 'ERROR',
        message: 'no user token provided'
      }, status: '401'
    end

    body = JSON.parse(request.body.read)

    # WARN: not validating input

    Result.create({
                    cpm: body['cpm'],
                    wpm: body['wpm'],
                    correct_cpm: body['correctCpm'],
                    time_elapsed: body['timeElapsed'],
                    final_mistakes: body['finalMistakes'],
                    total_mistakes: body['totalMistakes'],
                    total_words: body['totalWords'],
                    total_characters: body['totalCharacters'],
                    user_id: user['id']
                  })

    all = Result.where(user_id: user['id'])

    render json: {
      status: 'SUCCESS',
      message: 'Result created successfully',
      data: all
    }, status: '201'
  end
end
