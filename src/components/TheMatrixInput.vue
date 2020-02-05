<template>
    <div class="calculators__input-field calculators__input-field_fill">
        <div
            v-for="(m, mIdx) in matrix"
            :key="`matrix-${mIdx}`"
        >
            <div class="calc__array-container">
                <div
                    class="calc__letter"
                    v-html="`${m.label}&nbsp;&equals;`"
                ></div>
                <div
                    v-if="!invalid"
                    :ref="`matrix-${mIdx}`"
                    class="calc__array"
                >
                    <div
                        v-for="(r, rIdx) in +m.rows"
                        :key="`${m.label}-${r}-${rIdx}`"
                        class="calc__row"
                    >
                        <input
                            v-for="(c, cIdx) in +m.cols"
                            :key="`${m.label}-${c}-${cIdx}`"
                            type="text"
                            class="calc__input"
                            placeholder="0"
                        />
                    </div>
                </div>
            </div>
        </div>
        <!-- size errors info -->
        <div
            v-if="hasErrors"
            class="calculators__input-errors"
        >
            <span>Вводить можно числа или дроби (-2.4, 5/7, ...).</span>
            <!--<span
                v-for="(item, itName, itIdx) in calcErrors"
                :key="`${itName}-${itIdx}`"
                v-html="`&nbsp;${item}`"
            ></span>-->
        </div>
        <div class="calc__row calc__linear-equation">
            <div
                ref="row-0"
                class="calc__row"
            >
                <input
                    type="text"
                    class="calc__input"
                    placeholder="0"
                />
                <span class="calc__letter calc__letter_small">
                    <span class="calc__letter_operator">&times;</span><span>A</span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        matrix: {
            type: Array,
            default() {
                return [
                    {
                        label: 'A',
                        rows: 2,
                        cols: 2,
                    },
                ];
            },
        },
        min: {
            type: Number,
            default: 2,
        },

        max: {
            type: Number,
            default: 7,
        },

        validator: Object,
    },

    data() {
        return {
            hasErrors: false,
        };
    },
};

</script>
