module Api::V1
  class PlaylistsController < Api::V1::ApiController
    before_action :set_playlist, only: [:show, :update, :destroy]

    def index
      render json: current_user.playlists
    end

    def create
      @playlist = Playlist.new(resource_params)
      @playlist.user = current_user
      if @playlist.save
        render json: @playlist, status: :created
      else
        render json: @playlist.errors, status: :unprocessable_entity
      end
    end

    def show
      render json: @playlist, include: [:words]
    end

    def update
      attributes = resource_params.as_json
      attributes["words_attributes"] = attributes["words"]
      attributes.delete("words")
      if @playlist.update(attributes)
        render json: @playlist, include: [:words], status: :ok
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
        params.permit(:id, :name, :visible, :words => [:id, :key, :value])
      end
  end
end
