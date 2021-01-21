interface Config {
	name: string;
	age: number;
}
type Record1<K extends string | number | symbol, T> = { [P in K]+?: T };
type Key = keyof Partial<Config>;
type Test = Record1<keyof Partial<Config>, string>;
type Test2 = Partial<Record<keyof Config, string>>;
type Test3 = { [k in keyof Partial<Config>]: string };
interface Animal {
	name?: string;
	age: number;
}
