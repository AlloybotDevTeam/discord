import { ICommand } from '../../commander/Commander';
import { default as Alloybot } from '../../../Alloybot';

const lang = require('./Lang.json');
let Discord = Alloybot.getConnection('Discord').getConnection();
let Commander = Alloybot.getPlugin('Commander');

export default class Invite implements ICommand {
  public Name: string = 'invite';
  public Description: string = lang.description.invite;
  public Usage: string = 'invite';
  public Example: string = 'invite';
  public Type: string = lang.type[0];
  public Disabled: boolean = false;
  public Reason: null;
  public Subcommand?: ICommand[];

  private invite;

  constructor(permission: string[] | undefined) {
    this.invite = Discord.generateInvite(<string[]>permission);
  }

  public call(): Object {
    let Response = {
      title: lang.label.invite,
      description: ''
    }

    this.invite.then(inviteLink => {
      Response.description = inviteLink;
      Commander.emit('command.success', this);
    }).catch(error => {
      Response.title = 'Error generating link';
      Response.description = error.message;
      Commander.emit('command.error', { error: error, command: this.Name });
    });

    return Response;
  }
}
