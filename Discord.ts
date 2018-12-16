import { default as Alloybot, Type, Util } from 'Alloybot';
import { Client } from 'discord.js';

export default class Discord implements Type.IConnection {
  public readonly name: string = 'Discord';
  public readonly dependencies: string[] = [];
  public readonly dependants: Type.IPlugin[] = Alloybot.getDependants(this.name);
  public readonly connection: Client = new Client();

  constructor(token: string) {
    this.connection.login(token);
  }
}

Alloybot.registerConnection(new Discord(process.env["DISCORD_TOKEN"]));
