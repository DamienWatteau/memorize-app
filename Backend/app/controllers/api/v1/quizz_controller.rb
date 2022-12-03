module Api
  module V1
    class QuizzController < Api::V1::ApiController
      def show
        render json: current_user.words.shuffle
      end
    end
  end
end
