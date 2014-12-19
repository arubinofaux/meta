class CommentMailer < BaseMailer
  helper :app_icon
  helper :firesize
  helper :markdown

  layout 'new_email'

  def mentioned(user_id, comment_id)
    @user = User.find(user_id)
    @comment = NewsFeedItemComment.find(comment_id)
    @nfi = @comment.news_feed_item

    @target = target_name(@nfi)

    mailgun_tag 'comment_mentions'
    @email_description = 'all @mention emails'
    @fun = 'You must be so popular'

    mail   to: @user.email,
      subject: "@#{@comment.user.username} mentioned you on #{@target}"
  end

  def new_comment(user_id, comment_id)
    @user = User.find(user_id)
    @comment = NewsFeedItemComment.find(comment_id)
    @nfi = @comment.news_feed_item
    @product = @nfi.product

    @target = target_name(@nfi)

    thread_parts = [@nfi.id]
    message_parts = [@comment.id]
    options = list_headers(NewsFeedItem.to_s, @nfi.id, @user.username, thread_parts, message_parts, url_for(@comment.url_params)).merge(
      from: from_address_for(@comment.user),
      to:   @user.email,
      subject: "#{@target} in #{@product.name}"
    )

    mail(options) do |format|
      format.html { render layout: nil }
    end
  end

  # private
  def target_name(nfi)
    owner = nfi.source == @user ? 'owner' : 'other'
    target_type = nfi.target.class.name.underscore
    I18n.t("stories.subjects.long.#{target_type}.#{owner}", nfi.target.attributes.symbolize_keys)
  end
end