import { default as Alloybot, Type, Util, ConfigBuilder } from '../../Alloybot';
import { Client } from 'discord.js';

export default class Discord implements Type.IConnection {
  public readonly name: string = 'Discord';
  public readonly dependencies: string[] = [];
  public readonly dependants: Type.IPlugin[] = Alloybot.getDependants(this.name);
  public readonly connection: Client = new Client();
  public config;

  constructor() {
    let Config: ConfigBuilder = new ConfigBuilder('Discord', require('./package.json').version);
    Config.addOption('token', ['string'], 'Discord Bot Token');
    Config.close();
    this.config = Config.getConfig();
  }

  public connect(): Discord {
    this.connection.login(this.config.token);
    return this;
  }
}

Alloybot.registerConnection(new Discord().connect());
