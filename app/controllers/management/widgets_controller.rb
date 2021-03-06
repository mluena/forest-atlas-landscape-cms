class Management::WidgetsController < ManagementController
  before_action :set_site
  before_action :authenticate_user_for_site!
  before_action :ensure_management_user, only: :destroy

  def index
    dataset_ids = @site.get_datasets(current_user).map(&:id)
    @widgets = WidgetService.from_datasets dataset_ids
    @widgets = @widgets.map do |x|
      { widget: x,
        edit_url: edit_management_site_widget_step_path(params[:site_slug], x.id),
        delete_url: management_site_widget_step_path(params[:site_slug], x.id) }
    end
    @widgets
  end

  def destroy

  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_site
    @site = Site.find_by({slug: params[:site_slug]})

    if (@site.routes.any?)
      # We just want a valid URL for the site
      @url = @site.routes.first.host_with_scheme
    end
  end

end
