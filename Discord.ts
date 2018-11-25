import { IConnection, Alloybot, DependantList } from '../../../Alloybot';
import { Shard, ShardingManager } from 'discord.js';

export default class Discord implements IConnection {
  public readonly name: string = 'Discord';
  public readonly dependencies: string[] = [];
  public readonly dependants: DependantList = Alloybot.getDependants(this.name);
  public connection: Map<string, ShardingManager> = new Map();

  private shard_limit: number;

  constructor(options: string) {
    this.shard_limit = JSON.parse(options).SHARD_LIMIT;
  }

  public createShard(
    name: string,
    file: string,
    options: {
      totalShards?: number | 'auto';
      respawn?: boolean;
      shardArgs?: string[];
      token?: string;
    }
  ): ShardingManager {
    let shardman: ShardingManager;
    if (<number>options.totalShards > this.shard_limit) {
      options.totalShards = this.shard_limit;
      shardman = new ShardingManager(file, options);
    } else {
      shardman = new ShardingManager(file, options);
    }
    this.connection.set(name, shardman);
    return shardman;
  }
}

Alloybot.registerConnection(new Discord(process.env['DISCORD']));
