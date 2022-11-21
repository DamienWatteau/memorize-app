module Api::V1
  class PlaylistsController < Api::V1::ApiController
    before_action :set_playlist, only: [:show, :update, :destroy]

    def index
      render json: Playlist.all
    end

    def create
      @playlist = Playlist.new(resource_params)
      if @playlist.save
        render json: {}, status: :created
      else
        render json: @playlist.errors, status: :unprocessable_entity
      end
    end

    def show
      render json: @playlist, include: [:words]
    end

    def update
      if @playlist.update(resource_params)
        render json: {}, status: :ok
      else
        render json: @playlist.errors, status: :unprocessable_entity
      end
    end

    def destroy
      if @playlist.destroy
        render json: {}, status: :ok
      else
        render json: @playlist.errors, status: :unprocessable_entity
      end
    end

    private
      def set_playlist
        @playlist = Playlist.find(resource_params[:id])
      end

      def resource_params
        params.permit(:id, :name, :visible)
      end
  end
end
