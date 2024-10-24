import {defineStore} from 'pinia';

interface Spell {
    id: string;
    name: string;
    incantation: string;
    effect: string;
    canBeVerbal: boolean;
    type: string;
    light: string;
    creator: string;
}


export const useSpellStore = defineStore('spellStore', {

    state: () => ({
        spells: <Spell[]>[],
        filterSpells: <Spell[]>[],
        selectedSpell: <Spell | null>null,
        query: <string>''
    }),
    getters: {
        getSpells: (state) => state.spells,
        getFilterSpells: (state) => {
            const query = state.query.toLowerCase();
            return state.filterSpells = state.spells.filter((spell) =>
                spell.name.toLowerCase().startsWith(query)
            )
        }
    },
    actions: {
        async fetchSpells() {
            try {
                const {data} = await useFetch<Spell[]>('https://wizard-world-api.herokuapp.com/Spells');
                this.spells = data.value || [];
            } catch (error) {
                console.error('Failed to fetch spells:', error);
            }
        },
        async fetchSpellById(id: string) {
            try {
                const {data} = await useFetch<Spell>(`https://wizard-world-api.herokuapp.com/Spells/${id}`);
                this.selectedSpell = data.value || null;
            } catch (error) {
                console.error(`Failed to fetch spell with id ${id}:`, error);
            }
        }
    }
});
