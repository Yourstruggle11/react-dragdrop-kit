import type { Item } from '../../types/item';
import ItemCard from './ItemCard';
import ItemCompact from './ItemCompact';
import ItemDetailed from './ItemDetailed';

export type ItemStyle = 'card' | 'compact' | 'detailed';

export function renderItemFactory(
	style: ItemStyle,
	opts: { direction: 'vertical' | 'horizontal'; animate: boolean; onDuplicate(item: Item): void }
) {
	return (item: Item) => {
		if (style === 'compact') return <ItemCompact item={item} direction={opts.direction} animate={opts.animate} />;
		if (style === 'detailed')
			return (
				<ItemDetailed item={item} direction={opts.direction} animate={opts.animate} onDuplicate={opts.onDuplicate} />
			);
		return <ItemCard item={item} direction={opts.direction} />;
	};
}
