class UserMailer < Devise::Mailer
  helper :markdown, :wip

  layout 'email', only: [:welcome, :joined_team_no_work_yet]

  def welcome(user_id)
    mailgun_tag 'user#welcome'

    @user = User.find(user_id)

    mail from: "matt@assemblymade.com",
           to:  @user.email,
      subject: "Your Assembly welcome package"
  end

  def follow_up(user_id)
    mailgun_tag 'user#follow_up'

    @user = User.find(user_id)
    @user.touch(:personal_email_sent_on)

    mail from: "austin@assemblymade.com",
           to:  @user.email,
      subject: "Assembly"
  end

  def remind_user_of_their_claimed_work(user_id, wip_id)
    mailgun_tag 'user#remind_user_claimed_work'

    @user     = User.find(user_id)
    @wip      = Wip.find(wip_id)
    @worker   = Wip::Worker.where(:user_id => @user.id, :wip_id => @wip.id).first
    @watchers = (@wip.watchers.random.limit(3).to_a - [@user])[0...2]

    mail from: "matt@assemblymade.com",
           to:  @user.email,
          bcc: "matt@assemblymade.com",
      subject: "RE: #{@wip.title}"
  end

  def joined_team_no_work_yet(membership_id)
    mailgun_tag 'user#joined_team_no_work_yet'

    @membership = TeamMembership.find(membership_id)
    @user = @membership.user
    @product = @membership.product

    mail from: 'austin@assemblymade.com',
           to: @user.email,
      subject: "Need help getting started on #{@product.name}?"
  end

  protected

  def mailgun_tag(name)
    headers 'X-Mailgun-Tag' => name.to_s
  end

end
