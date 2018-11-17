import { IConnection, Alloybot } from '../../../Alloybot';

export default class Discord implements IConnection {
  public readonly name: String = 'Discord';
  public readonly dependencies: String[] = [];
  public connection: any = {};

  constructor(token: String) {}
}

Alloybot.registerConnection(new Discord(process.env['DISCORD_TOKEN']));
