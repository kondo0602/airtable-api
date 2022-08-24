type PokemonProps = {
  id: string;
  name: string;
  type1: string;
  type2: string;
};

export class Pokemon {
  private readonly id: string;
  private readonly name: string;
  private readonly type1: string;
  private readonly type2: string;

  private constructor(props: PokemonProps) {
    this.id = props.id;
    this.name = props.name;
    this.type1 = props.type1;
    this.type2 = props.type2;
  }

  public static create(props: PokemonProps) {
    if (!props.id) {
      throw new Error("IDを設定してください.");
    }

    if (!props.name) {
      throw new Error("名前を設定してください.");
    }

    if (props.name.length > 5) {
      throw new Error("名前は5文字以内で設定してください.");
    }

    if (!props.type1) {
      throw new Error("タイプを少なくとも1つ設定してください.");
    }

    if (props.type1 === props.type2) {
      throw new Error("タイプ1とタイプ2は別のタイプを設定してください.");
    }

    return new Pokemon(props);
  }

  public static reconstruct(props: PokemonProps) {
    return new Pokemon(props);
  }
}
