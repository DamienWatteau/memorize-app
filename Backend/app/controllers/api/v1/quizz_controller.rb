module Api
  module V1
    class QuizzController < Api::V1::ApiController
      def show
        render json: current_user.playlists.find(resource_params[:playlist_id]).words.shuffle
      end

      private

      def resource_params
        params.permit(:playlist_id)
      end
    end
  end
end
