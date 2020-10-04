type GenericConstructor = new (...args: unknown[]) => object

interface TreeOptions<
	DType extends GenericConstructor,
	Types extends GenericConstructor[]
	> {
	defaultType?: DType
	types?: Types
}

declare class Tree<
	Keys extends any[],
	Val,
	DType extends GenericConstructor = typeof Map,
	Types extends GenericConstructor[] = []
	> {
	private root: DType
	public options: TreeOptions<DType, Types>
	constructor(options: TreeOptions<DType, Types>)

	get(keys: Keys, value: false): DType | Types[number] | undefined
	get(keys: Keys, value: true): Val | undefined
	set(keys: Keys, value: Val): void
	has(keys: Keys): boolean
	clear(): void
	level(keys: Keys): Item<Keys, Val>[]
	private createNode(depth: number): DType | Types[number]
}

declare class Item<Keys extends any[], Val> {
	public keys: Keys
	public value: Val
	constructor(keys: Keys, value: Val)
}

export default class MultiDict<
	Keys extends any[],
	Val,
	DType extends GenericConstructor = typeof Map,
	Types extends GenericConstructor[] = []
	> {
	private tree: Tree<Keys, Val, DType, Types>
	private items: Set<Item<Keys, Val>>
	/**
	 * @param entries Iterable of [...keys, value] entries.
	 * @param options
	 */
	constructor(entries?: [...Keys, Val][], options?: TreeOptions<DType, Types>)
	get size(): number
	get [Symbol.toStringTag](): "MultiDict"
	set(...keysAndValue: [...Keys, Val]): this
	get(...keys: Keys): Val | undefined
	/**
	 * Check if an entry exists. Always false for partial key paths.
	 */
	has(...keys: Keys): boolean
	/**
	 * Delete an entry.
	 */
	delete(...keys: Keys): boolean
	/**
	 * Remove all entries
	 */
	clear(): void
	/**
	 * Create a new dictionary from the given level.
	 */
	level<NewKeys extends any[]>(
		...keys: Keys
	): MultiDict<NewKeys, Val, DType, Types>
	/**
	 * Get an iterator for each of the entries.
	 *
	 * @generator
	 */
	[Symbol.iterator](): IterableIterator<[Keys, Val]>
	/**
	 * Get an iterator for each of the entries.
	 *
	 * @generator
	 */
	entries(): IterableIterator<[Keys, Val]>
	/**
	 * Get an iterator for each of the keys.
	 *
	 * @generator
	 */
	keys(): IterableIterator<Keys>
	/**
	 * Get an iterator for each of the values.
	 *
	 * @generator
	 */
	values(): IterableIterator<Val>
	/**
	 * Call a callback for each of the registered entries.
	 *
	 * @param callback
	 * @param thisArg Optional 'this' context for the callback
	 */
	forEach<ThisArg>(
		callback: (this: ThisArg, key: Keys, val: Val, dict: this) => void,
		thisArg: ThisArg
	): void
}
