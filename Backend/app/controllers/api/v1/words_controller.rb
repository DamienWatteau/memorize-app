module Api::V1
  class WordsController < Api::V1::ApiController
    before_action :set_word, only: [:update, :destroy]

    def create
      @word = Word.new(resource_params)
      if @word.save
        render json: {}, status: :created
      else
        render json: @word.errors, status: :unprocessable_entity
      end
    end

    def update
      if @word.update(resource_params)
        render json: {}, status: :ok
      else
        render json: @word.errors, status: :unprocessable_entity
      end
    end

    def destroy
      if @word.destroy
        render json: {}, status: :ok
      else
        render json: @word.errors, status: :unprocessable_entity
      end
    end

    private
      def set_word
        @word = Word.find(resource_params[:id])
      end

      def resource_params
        params.permit(:id, :playlist_id, :key, :key_lang, :value, :value_lang)
      end
  end
end
