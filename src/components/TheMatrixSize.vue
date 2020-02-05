<template>
    <div>
        <div
            v-for="(m, mIdx) in matrix"
            :key="`matrix-${mIdx}.size`"
            class="form__inner"
        >
            <div class="form__col form__col_50 calculators__col-number">
                <label
                    class="form__label"
                    :for="`matrix-${m.label}.rows`"
                >Число строк</label>
                <div class="form__field">
                    <input
                        :id="`matrix-${m.label}.rows`"
                        v-model="m.rows.$model"
                        type="number"
                        :min="min"
                        :max="max"
                        class="input input_number"
                        placeholder="0"
                    />
                    <button
                        class="number-btn_rounded number-btn_rounded_minus"
                        :disabled="m.rows.$model <= min"
                        @click.prevent="m.rows.$model = m.rows.$model - 1"
                    >
                        &minus;
                    </button>
                    <button
                        class="number-btn_rounded number-btn_rounded_plus"
                        :disabled="m.rows.$model >= max"
                        @click.prevent="m.rows.$model = +m.rows.$model + 1"
                    >
                        &plus;
                    </button>
                </div>
            </div>
            <div
                v-if="vIdx < 1"
                class="form__col form__col_50 calculators__col-number"
            >
                <label
                    class="form__label"
                    :for="`matrix${m.label}.cols`"
                >Число столбцов</label>
                <div class="form__field">
                    <input
                        :id="`matrix${m.label}.cols`"
                        v-model="m.cols.$model"
                        type="number"
                        :min="m.cols.$params.minValue.min"
                        :max="m.cols.$params.maxValue.max"
                        class="input input_number"
                        placeholder="0"
                    />
                    <button
                        class="number-btn_rounded number-btn_rounded_minus"
                        :disabled="m.cols.$model <= m.cols.$params.minValue.min"
                        @click.prevent="m.cols.$model = m.cols.$model - 1"
                    >
                        &minus;
                    </button>
                    <button
                        class="number-btn_rounded number-btn_rounded_plus"
                        :disabled="m.cols.$model >= m.cols.$params.maxValue.max"
                        @click.prevent="m.cols.$model = +m.cols.$model + 1"
                    >
                        &plus;
                    </button>
                </div>
            </div>
            <div class="form__col">
                <div
                    v-if="m.$invalid"
                    class="calculators__input-errors"
                >
                    <span>Размер матрицы должно быть равен в пределе 2 до 7</span>
                </div>
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

