<template>
    <div>
        <!--1001-->
        <form class="calculators__matrix-number-mult" v-if="ex === 1001">
            <div class="calculators__title calculators__title_secondary">
                Введите данные
            </div>
            <div class="calculators__input-field">
                <div
                    v-for="(v, vIdx) in $v.m.matrix.$each.$iter"
                    :key="`matrix-${v.$model.label}.size`"
                    class="form__inner"
                >
                    <div
                        v-if="vIdx < 1"
                        class="form__col form__col_50 calculators__col-number"
                    >
                        <label
                            class="form__label"
                            :for="`matrix-${v.$model.label}.rows`"
                        >Число строк</label>
                        <div class="form__field">
                            <input
                                :id="`matrix-${v.$model.label}.rows`"
                                v-model="v.rows.$model"
                                type="number"
                                :min="v.rows.$params.minValue.min"
                                :max="v.rows.$params.maxValue.max"
                                class="input input_number"
                                placeholder="0"
                            />
                            <button
                                class="number-btn_rounded number-btn_rounded_minus"
                                :disabled="v.rows.$model <= v.rows.$params.minValue.min"
                                @click.prevent="v.rows.$model = v.rows.$model - 1"
                            >
                                &minus;
                            </button>
                            <button
                                class="number-btn_rounded number-btn_rounded_plus"
                                :disabled="v.rows.$model >= v.rows.$params.maxValue.max"
                                @click.prevent="v.rows.$model = +v.rows.$model + 1"
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
                            :for="`matrix${v.$model.label}.cols`"
                        >Число столбцов</label>
                        <div class="form__field">
                            <input
                                :id="`matrix${v.$model.label}.cols`"
                                v-model="v.cols.$model"
                                type="number"
                                :min="v.cols.$params.minValue.min"
                                :max="v.cols.$params.maxValue.max"
                                class="input input_number"
                                placeholder="0"
                            />
                            <button
                                class="number-btn_rounded number-btn_rounded_minus"
                                :disabled="v.cols.$model <= v.cols.$params.minValue.min"
                                @click.prevent="v.cols.$model = v.cols.$model - 1"
                            >
                                &minus;
                            </button>
                            <button
                                class="number-btn_rounded number-btn_rounded_plus"
                                :disabled="v.cols.$model >= v.cols.$params.maxValue.max"
                                @click.prevent="v.cols.$model = +v.cols.$model + 1"
                            >
                                &plus;
                            </button>
                        </div>
                    </div>
                    <div class="form__col">
                        <div
                            v-if="v.$invalid"
                            class="calculators__input-errors"
                        >
                            <span>Размер матрицы должно быть равен в пределе 2 до 7</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="calculators__footer">
                <div class="calculators__title calculators__title_small">
                    Введите значения матрицы
                </div>
                <div class="calculators__input-field calculators__input-field_fill">
                    <div
                        v-for="(v, vIdx) in $v.m.matrix.$each.$iter"
                        :key="`matrix-${vIdx}`"
                    >
                        <div
                            v-if="vIdx < 1"
                            class="calc__array-container"
                        >
                            <div
                                class="calc__letter"
                                v-html="`${v.$model.label}&nbsp;&equals;`"
                            ></div>
                            <div
                                v-if="!v.$invalid"
                                :ref="`matrix-${vIdx}`"
                                class="calc__array"
                            >
                                <div
                                    v-for="(i, iIdx) in +v.rows.$model"
                                    :key="`${v.$model.label}-${i}-${iIdx}`"
                                    class="calc__row"
                                >
                                    <input
                                        v-for="j in +v.cols.$model"
                                        :key="`${v.$model.label}-${j}-${iIdx}`"
                                        type="text"
                                        class="calc__input"
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
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
                <div class="calculators__submit">
                    <button
                        class="button button_primary"
                        @click.prevent="matrixNumberMult"
                    >
                        Рассчитать
                    </button>
                </div>
            </div>
        </form>
        <!--1002-->
        <form class="calculators__matrix-mult" v-if="ex === 1002">
            <div class="calculators__title calculators__title_secondary">
                Укажите размер матрицы
                <span v-html="$v.m.matrix.$each.$iter[0].$model.label"></span>
            </div>
            <div class="calculators__input-field">
                <div class="form__inner">
                    <div class="form__col form__col_50 calculators__col-number">
                        <label
                            class="form__label"
                            :for="`matrix${$v.m.matrix.$each.$iter[0].$model.label}.rows`"
                        >Число строк</label>
                        <div class="form__field">
                            <input
                                :id="`matrix-${$v.m.matrix.$each.$iter[0].$model.label}.rows`"
                                v-model="$v.m.matrix.$each.$iter[0].rows.$model"
                                type="number"
                                :min="$v.m.matrix.$each.$iter[0].rows.$params.minValue.min"
                                :max="$v.m.matrix.$each.$iter[0].rows.$params.maxValue.max"
                                class="input input_number"
                                placeholder="0"
                            />
                            <button
                                class="number-btn_rounded number-btn_rounded_minus"
                                :disabled="$v.m.matrix.$each.$iter[0].rows.$model
                                    <= $v.m.matrix.$each.$iter[0].rows.$params.minValue.min"
                                @click.prevent="$v.m.matrix.$each.$iter[0].rows.$model
                                    = $v.m.matrix.$each.$iter[1].cols.$model
                                    = $v.m.matrix.$each.$iter[0].rows.$model - 1"
                            >
                                &minus;
                            </button>
                            <button
                                class="number-btn_rounded number-btn_rounded_plus"
                                :disabled="$v.m.matrix.$each.$iter[0].rows.$model
                                    >= $v.m.matrix.$each.$iter[0].rows.$params.maxValue.max"
                                @click.prevent="$v.m.matrix.$each.$iter[0].rows.$model
                                    = $v.m.matrix.$each.$iter[1].cols.$model
                                    = +$v.m.matrix.$each.$iter[0].rows.$model + 1"
                            >
                                &plus;
                            </button>
                        </div>
                    </div>
                    <div class="form__col form__col_50 calculators__col-number">
                        <label
                            class="form__label"
                            :for="`matrix${$v.m.matrix.$each.$iter[0].$model.label}.cols`"
                        >Число столбцов</label>
                        <div class="form__field">
                            <input
                                :id="`matrix${$v.m.matrix.$each.$iter[0].$model.label}.cols`"
                                v-model="$v.m.matrix.$each.$iter[0].cols.$model"
                                type="number"
                                :min="$v.m.matrix.$each.$iter[0].cols.$params.minValue.min"
                                :max="$v.m.matrix.$each.$iter[0].cols.$params.maxValue.max"
                                class="input input_number"
                                placeholder="0"
                            />
                            <button
                                class="number-btn_rounded number-btn_rounded_minus"
                                :disabled="$v.m.matrix.$each.$iter[0].cols.$model
                                    <= $v.m.matrix.$each.$iter[0].cols.$params.minValue.min"
                                @click.prevent="$v.m.matrix.$each.$iter[0].cols.$model
                                    = $v.m.matrix.$each.$iter[1].rows.$model
                                    = $v.m.matrix.$each.$iter[0].cols.$model - 1"
                            >
                                &minus;
                            </button>
                            <button
                                class="number-btn_rounded number-btn_rounded_plus"
                                :disabled="$v.m.matrix.$each.$iter[0].cols.$model
                                    >= $v.m.matrix.$each.$iter[0].cols.$params.maxValue.max"
                                @click.prevent="$v.m.matrix.$each.$iter[0].cols.$model
                                    = $v.m.matrix.$each.$iter[1].rows.$model
                                    = +$v.m.matrix.$each.$iter[0].cols.$model + 1"
                            >
                                &plus;
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="calculators__title calculators__title_secondary">
                Укажите размер матрицы
                <span v-html="$v.m.matrix.$each.$iter[1].$model.label"></span>
            </div>
            <div class="calculators__input-field">
                <div class="form__inner">
                    <div class="form__col form__col_50 calculators__col-number">
                        <label
                            class="form__label"
                            :for="`matrix${$v.m.matrix.$each.$iter[1].$model.label}.rows`"
                        >Число строк</label>
                        <div class="form__field">
                            <input
                                :id="`matrix${$v.m.matrix.$each.$iter[1].$model.label}.rows`"
                                v-model="$v.m.matrix.$each.$iter[1].rows.$model
                                    = $v.m.matrix.$each.$iter[0].cols.$model"
                                type="number"
                                :min="$v.m.matrix.$each.$iter[1].rows.$params.minValue.min"
                                :max="$v.m.matrix.$each.$iter[1].rows.$params.maxValue.max"
                                class="input input_number"
                                placeholder="0"
                            />
                            <button
                                class="number-btn_rounded number-btn_rounded_minus"
                                :disabled="$v.m.matrix.$each.$iter[1].rows.$model
                                    <= $v.m.matrix.$each.$iter[1].rows.$params.minValue.min"
                                @click.prevent="$v.m.matrix.$each.$iter[1].rows.$model
                                    = $v.m.matrix.$each.$iter[0].cols.$model
                                    = $v.m.matrix.$each.$iter[1].rows.$model - 1"
                            >
                                &minus;
                            </button>
                            <button
                                class="number-btn_rounded number-btn_rounded_plus"
                                :disabled="$v.m.matrix.$each.$iter[1].rows.$model
                                    >= $v.m.matrix.$each.$iter[1].rows.$params.maxValue.max"
                                @click.prevent="$v.m.matrix.$each.$iter[1].rows.$model
                                    = $v.m.matrix.$each.$iter[0].cols.$model
                                    = +$v.m.matrix.$each.$iter[1].rows.$model + 1"
                            >
                                &plus;
                            </button>
                        </div>
                    </div>
                    <div class="form__col form__col_50 calculators__col-number">
                        <label
                            class="form__label"
                            for="`matrix${$v.m.matrix.$each.$iter[1].$model.label}.cols`"
                        >Число столбцов</label>
                        <div class="form__field">
                            <input
                                :id="`matrix${$v.m.matrix.$each.$iter[1].$model.label}.cols`"
                                v-model="$v.m.matrix.$each.$iter[1].cols.$model =
                                    $v.m.matrix.$each.$iter[0].rows.$model"
                                type="number"
                                :min="$v.m.matrix.$each.$iter[1].cols.$params.minValue.min"
                                :max="$v.m.matrix.$each.$iter[1].cols.$params.maxValue.max"
                                class="input input_number"
                                placeholder="0"
                            />
                            <button
                                class="number-btn_rounded number-btn_rounded_minus"
                                :disabled="$v.m.matrix.$each.$iter[0].cols.$model
                                    <= $v.m.matrix.$each.$iter[1].cols.$params.minValue.min"
                                @click.prevent="$v.m.matrix.$each.$iter[1].cols.$model
                                    = $v.m.matrix.$each.$iter[0].rows.$model
                                    = $v.m.matrix.$each.$iter[1].cols.$model - 1"
                            >
                                &minus;
                            </button>
                            <button
                                class="number-btn_rounded number-btn_rounded_plus"
                                :disabled="$v.m.matrix.$each.$iter[1].cols.$model
                                    >= $v.m.matrix.$each.$iter[1].cols.$params.maxValue.max"
                                @click.prevent="$v.m.matrix.$each.$iter[1].cols.$model
                                    = $v.m.matrix.$each.$iter[0].rows.$model
                                    = +$v.m.matrix.$each.$iter[1].cols.$model + 1"
                            >
                                &plus;
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                v-if="$v.m.matrix.$each.$iter[0].$invalid || $v.m.matrix.$each.$iter[1].$invalid"
                class="calculators__input-errors"
            >
                <span>Размер матриц должно быть равен в пределе 2 до 7</span>
            </div>

            <div class="calculators__footer">
                <div class="calculators__title calculators__title_small">
                    Введите значения матрицы
                    <span v-html="$v.m.matrix.$each.$iter[0].$model.label"></span>
                </div>
                <div class="calculators__input-field calculators__input-field_fill">
                    <div class="calc__array-container">
                        <div
                            class="calc__letter"
                            v-html="`${$v.m.matrix.$each.$iter[0].$model.label}&nbsp;&equals;`"
                        ></div>
                        <div
                            v-if="!$v.m.matrix.$each.$iter[0].$invalid"
                            ref="matrix-0"
                            class="calc__array"
                        >
                            <div
                                v-for="(i, iIdx) in +$v.m.matrix.$each.$iter[0].rows.$model"
                                :key="`${iIdx}.row`"
                                class="calc__row"
                            >
                                <input
                                    v-for="(j, jIdx) in +$v.m.matrix.$each.$iter[0].cols.$model"
                                    :key="`${iIdx}.${jIdx}.cell`"
                                    type="text"
                                    class="calc__input"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        v-if="hasErrorsByName('matrix', 0)"
                        class="calculators__input-errors"
                    >
                        <span>Вводить можно числа или дроби (-2.4, 5/7, ...).</span>
                        <span>Ошибки в ячейках:</span><span
                        v-for="(item, itName, itIdx) in calcErrors.matrix[0]"
                        :key="`${itName}-${itIdx}`"
                        v-html="`&nbsp;${item}`"
                    ></span>
                    </div>
                </div>
                <div class="calculators__title calculators__title_small">
                    Введите значения матрицы
                    <span v-html="$v.m.matrix.$each.$iter[1].$model.label"></span>
                </div>
                <div class="calculators__input-field calculators__input-field_fill">
                    <div class="calc__array-container">
                        <div
                            class="calc__letter"
                            v-html="`${$v.m.matrix.$each.$iter[1].$model.label}&nbsp;&equals;`"
                        ></div>
                        <div
                            v-if="!$v.m.matrix.$each.$iter[1].$invalid"
                            ref="matrix-1"
                            class="calc__array"
                        >
                            <div
                                v-for="(i, iIdx) in +$v.m.matrix.$each.$iter[1].rows.$model"
                                :key="`${iIdx}.row`"
                                class="calc__row"
                            >
                                <input
                                    v-for="(j, jIdx) in +$v.m.matrix.$each.$iter[1].cols.$model"
                                    :key="`${iIdx}.${jIdx}.cell`"
                                    type="text"
                                    class="calc__input"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        v-if="hasErrorsByName('matrix', 1)"
                        class="calculators__input-errors"
                    >
                        <span>Вводить можно числа или дроби (-2.4, 5/7, ...).</span>
                        <span>Ошибки в ячейках:</span><span
                        v-for="(item, itName, itIdx) in calcErrors.matrix[1]"
                        :key="`${itName}-${itIdx}`"
                        v-html="`&nbsp;${item}`"
                    ></span>
                    </div>
                </div>
                <div class="calculators__submit">
                    <button
                        class="button button_primary"
                        @click.prevent="matrixMult"
                    >
                        Рассчитать
                    </button>
                </div>
            </div>
        </form>
        <!-- 1003 Вектор на число -->
        <form class="calculators__vector-cos" v-if="exId === 1003">
            <div class="calculators__title calculators__title_secondary">
                Укажите размерность вектора
            </div>
            <div class="calculators__input-field">
                <div class="form__inner">
                    <div class="form__col form__col_50 calculators__col-number">
                        <label
                            class="form__label"
                            for="vector_size"
                        ></label>
                        <div class="form__field">
                            <input
                                id="vector_size"
                                v-model="v.size"
                                type="number"
                                min="2"
                                max="3"
                                class="input input_number"
                                placeholder="0"
                            />
                            <button
                                class="number-btn_rounded number-btn_rounded_minus"
                                :disabled="v.size <= 2"
                                @click.prevent="v.size = v.size - 1"
                            >
                                &minus;
                            </button>
                            <button
                                class="number-btn_rounded number-btn_rounded_plus"
                                :disabled="v.size >= 3"
                                @click.prevent="v.size = +v.size + 1"
                            >
                                &plus;
                            </button>
                        </div>
                    </div>
                    <div class="form__col">
                        <div
                            v-if="$v.v.size.$invalid"
                            class="calculators__input-errors"
                        >
                            <span>Размерность вектора должна быть 2 или 3</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="calculators__footer">
                <!-- vectors type -->
                <div
                    v-for="vector in $v.v.vector.$each.$iter"
                    :key="vector.label"
                >
                    <div class="calculators__title calculators__title_small">
                        Форма представления вектора&nbsp;<span v-html="vector.$model.label"></span>
                    </div>
                    <div class="calculators__input-field calculators__input-field_fill">
                        <div class="calc__select-box">
                            <select
                                v-model="vector.$model.type"
                                name="vectorType"
                                class="calc__input select calc__select"
                            >
                                <option :value="0">Координатами</option>
                                <option :value="1">Точками</option>
                            </select>
                            <span class="select__marker"></span>
                        </div>
                    </div>
                </div>
                <div v-if="v.vector[0].type === 0">
                    <div class="calculators__title calculators__title_small">
                        Значение вектора
                    </div>
                    <div class="calculators__input-field calculators__input-field_fill">
                        <div class="calc__array-container">
                            <div class="calc__letter">
                                <span class="calc__letter-vector">a</span>&nbsp;&equals;
                            </div>
                            <div
                                v-if="!$v.v.size.$invalid"
                                ref="row-0"
                                class="calc__array"
                            >
                                <input
                                    v-for="(i, iIdx) in +v.size"
                                    :key="`size-i-${iIdx}`"
                                    type="text"
                                    class="calc__input"
                                    placeholder="0"
                                    autocomplete="off"
                                />
                            </div>
                        </div>
                        <div class="calc__row calc__linear-equation">
                            <div
                                ref="row-1"
                                class="calc__row"
                            >
                                <input
                                    type="text"
                                    class="calc__input"
                                    placeholder="0"
                                />
                                <span class="calc__letter calc__letter_small">
                                    <span class="calc__letter_operator">&times;</span>
                                    <span style="text-decoration:overline;">a</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="calculators__title calculators__title_small">
                        Начальная точка
                    </div>
                    <div class="calculators__input-field calculators__input-field_fill">
                        <div class="calc__array-container">
                            <div class="calc__letter">
                                A&nbsp;&equals;
                            </div>
                            <div
                                v-if="!$v.v.size.$invalid"
                                ref="row-0"
                                class="calc__array"
                            >
                                <input
                                    v-for="(i, iIdx) in +v.size"
                                    :key="`size-i-${iIdx}`"
                                    type="text"
                                    class="calc__input"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="calculators__title calculators__title_small">
                        Конечная точка
                    </div>
                    <div class="calculators__input-field calculators__input-field_fill">
                        <div class="calc__array-container">
                            <div class="calc__letter">
                                B&nbsp;&equals;
                            </div>
                            <div
                                v-if="!$v.v.size.$invalid"
                                ref="row-1"
                                class="calc__array"
                            >
                                <input
                                    v-for="(j, jIdx) in +v.size"
                                    :key="`size-j-${jIdx}`"
                                    type="text"
                                    class="calc__input"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                        <div class="calc__row calc__linear-equation">
                            <div
                                ref="row-2"
                                class="calc__row"
                            >
                                <input
                                    type="text"
                                    class="calc__input"
                                    placeholder="0"
                                />
                                <span class="calc__letter calc__letter_small">
                                    <span class="calc__letter_operator">&times;</span>
                                    <span style="text-decoration:overline;">AB</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    v-if="rowsHasErrors"
                    class="calculators__input-errors"
                >
                    <span>Вводить можно числа или дроби (-2.4, 5/7, ...).</span>
                </div>
                <div class="calculators__submit">
                    <button
                        class="button button_primary"
                        @click.prevent="vectorProductToNumber"
                    >
                        Рассчитать
                    </button>
                </div>
            </div>
        </form>
        <!-- 1004 Угол между векторами -->
        <form class="calculators__vector-cos" v-if="exId === 1004">
            <div class="calculators__title calculators__title_secondary">
                Укажите размерность векторов
            </div>
            <div class="calculators__input-field">
                <div class="form__inner">
                    <div class="form__col form__col_50 calculators__col-number">
                        <label
                            class="form__label"
                            for="vector_size"
                        ></label>
                        <div class="form__field">
                            <input
                                id="vector_size"
                                v-model="v.size"
                                type="number"
                                min="2"
                                max="3"
                                class="input input_number"
                                placeholder="0"
                            />
                            <button
                                class="number-btn_rounded number-btn_rounded_minus"
                                :disabled="v.size <= 2"
                                @click.prevent="v.size = v.size - 1"
                            >
                                &minus;
                            </button>
                            <button
                                class="number-btn_rounded number-btn_rounded_plus"
                                :disabled="v.size >= 3"
                                @click.prevent="v.size = +v.size + 1"
                            >
                                &plus;
                            </button>
                        </div>
                    </div>
                    <div class="form__col">
                        <div
                            v-if="$v.v.size.$invalid"
                            class="calculators__input-errors"
                        >
                            <span>Размерность вектора должна быть 2 или 3</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="calculators__footer">
                <!-- vectors type -->
                <div
                    v-for="vector in $v.v.vector.$each.$iter"
                    :key="vector.label"
                >
                    <div class="calculators__title calculators__title_small">
                        Форма представления вектора&nbsp;<span v-html="vector.$model.label"></span>
                    </div>
                    <div class="calculators__input-field calculators__input-field_fill">
                        <div class="calc__select-box">
                            <select
                                v-model="vector.$model.type"
                                name="vectorType"
                                class="calc__input select calc__select"
                            >
                                <option :value="0">Координатами</option>
                                <option :value="1">Точками</option>
                            </select>
                            <span class="select__marker"></span>
                        </div>
                    </div>
                </div>
                <!-- first vector input -->
                <div v-if="v.vector[0].type === 0">
                    <div class="calculators__title calculators__title_small">
                        Значение вектора
                    </div>
                    <div class="calculators__input-field calculators__input-field_fill">
                        <div class="calc__array-container">
                            <div class="calc__letter">
                                <span class="calc__letter-vector">
                                    <span v-html="v.vector[0].label"></span>
                                </span>&nbsp;&equals;
                            </div>
                            <div
                                v-if="!$v.v.size.$invalid"
                                ref="row-0"
                                class="calc__array"
                            >
                                <input
                                    v-for="(i, iIdx) in +v.size"
                                    :key="`size-i-${iIdx}`"
                                    type="text"
                                    class="calc__input"
                                    placeholder="0"
                                    autocomplete="off"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="calculators__input-field calculators__input-field_fill">
                        <div class="calculators__title calculators__title_small">
                            Начальная точка
                        </div>
                        <div class="calc__array-container">
                            <div class="calc__letter">
                                A&nbsp;&equals;
                            </div>
                            <div
                                v-if="!$v.v.size.$invalid"
                                ref="row-0"
                                class="calc__array"
                            >
                                <input
                                    v-for="(i, iIdx) in +v.size"
                                    :key="`size-i-${iIdx}`"
                                    type="text"
                                    class="calc__input"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                        <div class="calculators__title calculators__title_small">
                            Конечная точка
                        </div>
                        <div class="calc__array-container">
                            <div class="calc__letter">
                                B&nbsp;&equals;
                            </div>
                            <div
                                v-if="!$v.v.size.$invalid"
                                ref="row-1"
                                class="calc__array"
                            >
                                <input
                                    v-for="(j, jIdx) in +v.size"
                                    :key="`size-j-${jIdx}`"
                                    type="text"
                                    class="calc__input"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <!-- second vector input -->
                <div v-if="v.vector[1].type === 0">
                    <div class="calculators__title calculators__title_small">
                        Значение вектора
                    </div>
                    <div class="calculators__input-field calculators__input-field_fill">
                        <div class="calc__array-container">
                            <div class="calc__letter">
                                <span class="calc__letter-vector">
                                    <span v-html="v.vector[1].label"></span>
                                </span>&nbsp;&equals;
                            </div>
                            <div
                                v-if="!$v.v.size.$invalid"
                                ref="row-2"
                                class="calc__array"
                            >
                                <input
                                    v-for="(i, iIdx) in +v.size"
                                    :key="`size-i-${iIdx}`"
                                    type="text"
                                    class="calc__input"
                                    placeholder="0"
                                    autocomplete="off"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="calculators__input-field calculators__input-field_fill">
                        <div class="calculators__title calculators__title_small">
                            Начальная точка
                        </div>
                        <div class="calc__array-container">
                            <div class="calc__letter">
                                A&nbsp;&equals;
                            </div>
                            <div
                                v-if="!$v.v.size.$invalid"
                                ref="row-2"
                                class="calc__array"
                            >
                                <input
                                    v-for="(i, iIdx) in +v.size"
                                    :key="`size-i-${iIdx}`"
                                    type="text"
                                    class="calc__input"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                        <div class="calculators__title calculators__title_small">
                            Конечная точка
                        </div>
                        <div class="calc__array-container">
                            <div class="calc__letter">
                                B&nbsp;&equals;
                            </div>
                            <div
                                v-if="!$v.v.size.$invalid"
                                ref="row-3"
                                class="calc__array"
                            >
                                <input
                                    v-for="(j, jIdx) in +v.size"
                                    :key="`size-j-${jIdx}`"
                                    type="text"
                                    class="calc__input"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    v-if="rowsHasErrors"
                    class="calculators__input-errors"
                >
                    <span>Вводить можно числа или дроби (-2.4, 5/7, ...).</span>
                </div>
                <div class="calculators__submit">
                    <button
                        class="button button_primary"
                        @click.prevent="vectorAngleBetween"
                    >
                        Рассчитать
                    </button>
                </div>
            </div>
        </form>
        <!--1005-->
        <form class="calculators__matrix-transpose" v-if="ex === 1005">
            <div class="calculators__title calculators__title_secondary">
                Введите данные
            </div>
            <div class="calculators__input-field">
                <div
                    v-for="(v, vIdx) in $v.m.matrix.$each.$iter"
                    :key="`matrix-${v.$model.label}.size`"
                    class="form__inner"
                >
                    <div
                        v-if="vIdx < 1"
                        class="form__col form__col_50 calculators__col-number"
                    >
                        <label
                            class="form__label"
                            :for="`matrix-${v.$model.label}.rows`"
                        >Число строк</label>
                        <div class="form__field">
                            <input
                                :id="`matrix-${v.$model.label}.rows`"
                                v-model="v.rows.$model"
                                type="number"
                                :min="v.rows.$params.minValue.min"
                                :max="v.rows.$params.maxValue.max"
                                class="input input_number"
                                placeholder="0"
                            />
                            <button
                                class="number-btn_rounded number-btn_rounded_minus"
                                :disabled="v.rows.$model <= v.rows.$params.minValue.min"
                                @click.prevent="v.rows.$model = v.rows.$model - 1"
                            >
                                &minus;
                            </button>
                            <button
                                class="number-btn_rounded number-btn_rounded_plus"
                                :disabled="v.rows.$model >= v.rows.$params.maxValue.max"
                                @click.prevent="v.rows.$model = +v.rows.$model + 1"
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
                            :for="`matrix${v.$model.label}.cols`"
                        >Число столбцов</label>
                        <div class="form__field">
                            <input
                                :id="`matrix${v.$model.label}.cols`"
                                v-model="v.cols.$model"
                                type="number"
                                :min="v.cols.$params.minValue.min"
                                :max="v.cols.$params.maxValue.max"
                                class="input input_number"
                                placeholder="0"
                            />
                            <button
                                class="number-btn_rounded number-btn_rounded_minus"
                                :disabled="v.cols.$model <= v.cols.$params.minValue.min"
                                @click.prevent="v.cols.$model = v.cols.$model - 1"
                            >
                                &minus;
                            </button>
                            <button
                                class="number-btn_rounded number-btn_rounded_plus"
                                :disabled="v.cols.$model >= v.cols.$params.maxValue.max"
                                @click.prevent="v.cols.$model = +v.cols.$model + 1"
                            >
                                &plus;
                            </button>
                        </div>
                    </div>
                    <div class="form__col">
                        <div
                            v-if="v.$invalid"
                            class="calculators__input-errors"
                        >
                            <span>Размер матрицы должно быть равен в пределе 2 до 7</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="calculators__footer">
                <div class="calculators__title calculators__title_small">
                    Введите значения матрицы
                </div>
                <div class="calculators__input-field calculators__input-field_fill">
                    <div
                        v-for="(v, vIdx) in $v.m.matrix.$each.$iter"
                        :key="`matrix-${vIdx}`"
                    >
                        <div
                            v-if="vIdx < 1"
                            class="calc__array-container"
                        >
                            <div
                                class="calc__letter"
                                v-html="`${v.$model.label}&nbsp;&equals;`"
                            ></div>
                            <div
                                v-if="!v.$invalid"
                                :ref="`matrix-${vIdx}`"
                                class="calc__array"
                            >
                                <div
                                    v-for="(i, iIdx) in +v.rows.$model"
                                    :key="`${v.$model.label}-${i}-${iIdx}`"
                                    class="calc__row"
                                >
                                    <input
                                        v-for="j in +v.cols.$model"
                                        :key="`${v.$model.label}-${j}-${iIdx}`"
                                        type="text"
                                        class="calc__input"
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
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
                </div>
                <div class="calculators__submit">
                    <button
                        class="button button_primary"
                        @click.prevent="matrixTranspose"
                    >
                        Рассчитать
                    </button>
                </div>
            </div>
        </form>
        <!-- 1006 Произведегние векторов смешанное -->
        <form class="calculators__vector-cos" v-if="exId === 1006">
            <div class="calculators__footer">
                <!-- vectors type -->
                <div
                    v-for="vector in $v.v.vector.$each.$iter"
                    :key="vector.label"
                >
                    <div class="calculators__title calculators__title_small">
                        Форма представления вектора&nbsp;<span v-html="vector.$model.label"></span>
                    </div>
                    <div class="calculators__input-field calculators__input-field_fill">
                        <div class="calc__select-box">
                            <select
                                v-model="vector.$model.type"
                                name="vectorType"
                                class="calc__input select calc__select"
                            >
                                <option :value="0">Координатами</option>
                                <option :value="1">Точками</option>
                            </select>
                            <span class="select__marker"></span>
                        </div>
                    </div>
                </div>
                <!-- vectors input -->
                <div
                    v-for="(vector, vName, vIdx) in $v.v.vector.$each.$iter"
                    :key="vector.label"
                >
                    <div v-if="vector.$model.type === 0">
                        <div class="calculators__title calculators__title_small">
                            Значение вектора
                        </div>
                        <div class="calculators__input-field calculators__input-field_fill">
                            <div class="calc__array-container">
                                <div class="calc__letter">
                                    <span class="calc__letter-vector">
                                        <span v-html="vector.$model.label"></span>
                                    </span>&nbsp;&equals;
                                </div>
                                <div
                                    v-if="!$v.v.size.$invalid"
                                    :ref="`row-${vIdx}`"
                                    class="calc__array"
                                >
                                    <input
                                        v-for="(i, iIdx) in +v.size"
                                        :key="`size-i-${iIdx}`"
                                        type="text"
                                        class="calc__input"
                                        placeholder="0"
                                        autocomplete="off"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div
                            class="calculators__input-field calculators__input-field_fill"
                            :ref="`row-${vIdx}`"
                        >
                            <div class="calculators__title calculators__title_small">
                                Начальная точка
                            </div>
                            <div class="calc__array-container">
                                <div class="calc__letter">
                                    A&nbsp;&equals;
                                </div>
                                <div
                                    v-if="!$v.v.size.$invalid"
                                    class="calc__array"
                                >
                                    <input
                                        v-for="(i, iIdx) in +v.size"
                                        :key="`size-i-${iIdx}`"
                                        type="text"
                                        class="calc__input"
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                            <div class="calculators__title calculators__title_small">
                                Конечная точка
                            </div>
                            <div class="calc__array-container">
                                <div class="calc__letter">
                                    B&nbsp;&equals;
                                </div>
                                <div
                                    v-if="!$v.v.size.$invalid"
                                    class="calc__array"
                                >
                                    <input
                                        v-for="(j, jIdx) in +v.size"
                                        :key="`size-j-${jIdx}`"
                                        type="text"
                                        class="calc__input"
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    v-if="rowsHasErrors"
                    class="calculators__input-errors"
                >
                    <span>Вводить можно числа или дроби (-2.4, 5/7, ...).</span>
                </div>
                <div class="calculators__submit">
                    <button
                        class="button button_primary"
                        @click.prevent="vectorMixedProduct"
                    >
                        Рассчитать
                    </button>
                </div>
            </div>
        </form>
        <!--1007-->
        <form class="calculators__matrix-sum" v-if="ex === 1007">
            <div class="calculators__title calculators__title_secondary">
                Введите данные
            </div>
            <div class="calculators__input-field">
                <div class="form__inner">
                    <div class="form__col form__col_50 calculators__col-number">
                        <label
                            class="form__label"
                            :for="`matrix${$v.m.matrix.$model[0].label}.rows`"
                        >Число строк</label>
                        <div class="form__field">
                            <input
                                :id="`matrix-${$v.m.matrix.$each.$iter[0].$model.label}.rows`"
                                v-model="$v.m.matrix.$each.$iter[0].rows.$model
                                    = $v.m.matrix.$each.$iter[1].rows.$model"
                                type="number"
                                :min="$v.m.matrix.$each.$iter[0].rows.$params.minValue.min"
                                :max="$v.m.matrix.$each.$iter[0].rows.$params.maxValue.max"
                                class="input input_number"
                                placeholder="0"
                            />
                            <button
                                class="number-btn_rounded number-btn_rounded_minus"
                                :disabled="$v.m.matrix.$each.$iter[0].rows.$model
                                    <= $v.m.matrix.$each.$iter[0].rows.$params.minValue.min"
                                @click.prevent="$v.m.matrix.$each.$iter[0].rows.$model
                                    = $v.m.matrix.$each.$iter[1].rows.$model
                                    = $v.m.matrix.$each.$iter[0].rows.$model - 1"
                            >
                                &minus;
                            </button>
                            <button
                                class="number-btn_rounded number-btn_rounded_plus"
                                :disabled="$v.m.matrix.$each.$iter[0].rows.$model
                                    >= $v.m.matrix.$each.$iter[0].rows.$params.maxValue.max"
                                @click.prevent="$v.m.matrix.$each.$iter[0].rows.$model
                                    = $v.m.matrix.$each.$iter[1].rows.$model
                                    = +$v.m.matrix.$each.$iter[0].rows.$model + 1"
                            >
                                &plus;
                            </button>
                        </div>
                    </div>
                    <div class="form__col form__col_50 calculators__col-number">
                        <label
                            class="form__label"
                            :for="`matrix${$v.m.matrix.$each.$iter[0].$model.label}.cols`"
                        >Число столбцов</label>
                        <div class="form__field">
                            <input
                                :id="`matrix${$v.m.matrix.$each.$iter[0].$model.label}.cols`"
                                v-model="$v.m.matrix.$each.$iter[0].cols.$model
                                    = $v.m.matrix.$each.$iter[1].cols.$model"
                                type="number"
                                :min="$v.m.matrix.$each.$iter[0].cols.$params.minValue.min"
                                :max="$v.m.matrix.$each.$iter[0].cols.$params.maxValue.max"
                                class="input input_number"
                                placeholder="0"
                            />
                            <button
                                class="number-btn_rounded number-btn_rounded_minus"
                                :disabled="$v.m.matrix.$each.$iter[0].cols.$model
                                    <= $v.m.matrix.$each.$iter[0].cols.$params.minValue.min"
                                @click.prevent="$v.m.matrix.$each.$iter[0].cols.$model
                                    = $v.m.matrix.$each.$iter[1].cols.$model
                                    = $v.m.matrix.$each.$iter[0].cols.$model - 1"
                            >
                                &minus;
                            </button>
                            <button
                                class="number-btn_rounded number-btn_rounded_plus"
                                :disabled="$v.m.matrix.$each.$iter[0].cols.$model
                                    >= $v.m.matrix.$each.$iter[0].cols.$params.maxValue.max"
                                @click.prevent="$v.m.matrix.$each.$iter[0].cols.$model
                                    = $v.m.matrix.$each.$iter[1].cols.$model
                                    = +$v.m.matrix.$each.$iter[0].cols.$model + 1"
                            >
                                &plus;
                            </button>
                        </div>
                    </div>
                    <div class="form__col">
                        <div
                            v-if="$v.m.matrix.$each.$iter[0].$invalid || $v.m.matrix.$each.$iter[1].$invalid"
                            class="calculators__input-errors"
                        >
                            <span>Размер матриц должно быть равен в пределе 2 до 7</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="calculators__footer">
                <div class="calculators__title calculators__title_small">
                    Введите значения матрицы
                </div>
                <div class="calculators__input-field calculators__input-field_fill">
                    <div
                        v-for="(v, vIdx) in $v.m.matrix.$each.$iter"
                        :key="`${vIdx}.row`"
                        class="calc__array-container"
                    >
                        <div
                            class="calc__letter"
                            v-html="`${v.$model.label}&nbsp;&equals;`"
                        ></div>
                        <div
                            v-if="!v.$invalid"
                            :ref="`matrix-${vIdx}`"
                            class="calc__array"
                        >
                            <div
                                v-for="(i, iIdx) in +v.$model.rows"
                                :key="`${iIdx}.row`"
                                class="calc__row"
                            >
                                <input
                                    v-for="(j, jIdx) in +v.$model.cols"
                                    :key="`${iIdx}.${jIdx}.cell`"
                                    type="text"
                                    class="calc__input"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- matrix field errors -->
                    <template v-for="(mError, mErrorIdx) in $v.m.matrix.$each.$iter">
                        <div
                            v-if="hasErrorsByName('matrix', mErrorIdx)"
                            :key="`matrix-${mErrorIdx}.error-list`"
                            class="calculators__input-errors"
                        >
                            <span>Вводить можно числа или дроби (-2.4, 5/7, ...).</span>
                            <span>Ошибки в ячейках матрицы № <span v-html="+mErrorIdx + 1"></span>:</span><span
                            v-for="(item, itName, itIdx) in calcErrors.matrix[mErrorIdx]"
                            :key="`${itName}-${itIdx}`"
                            v-html="`&nbsp;${item}`"
                        ></span>
                        </div>
                    </template>

                    <!-- linear-equation -->
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
                                <span class="calc__letter_operator">&times;</span>
                                <span v-html="$v.m.matrix.$each.$iter[0].$model.label"></span>
                            </span>
                        </div>
                        <div class="calc__action-block">
                            <button
                                class="calc__action"
                                :class="{ _active : m.operator === '-' }"
                                @click.prevent="m.operator = '-'"
                            >
                                <span>&minus;</span>
                            </button>
                            <button
                                class="calc__action"
                                :class="{ _active : m.operator === '+' }"
                                @click.prevent="m.operator = '+'"
                            >
                                <span>&plus;</span>
                            </button>
                        </div>
                        <div
                            ref="row-1"
                            class="calc__row"
                        >
                            <input
                                type="text"
                                class="calc__input"
                                placeholder="0"
                            />
                            <span class="calc__letter calc__letter_small">
                                <span class="calc__letter_operator">&times;</span>
                                <span v-html="$v.m.matrix.$each.$iter[1].$model.label"></span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="calculators__submit">
                    <button
                        class="button button_primary"
                        @click.prevent="matrixSum"
                    >
                        Рассчитать
                    </button>
                </div>
            </div>
        </form>
        <!-- 1013 СЛУ -->
        <form class="calculators__equation-system" v-if="exId === 1013">
            <div class="calculators__title calculators__title_secondary">
                Выберите метод
            </div>
            <div class="calculators__input-field">
                <div class="form__inner">
                    <div class="calc__select-box">
                        <select
                            id="equation.method"
                            v-model="equation.method"
                            name="equationMethod"
                            class="calc__input select calc__select"
                        >
                            <option :value="1">Метод подстановки</option>
                            <option :value="2">Метод Крамера</option>
                            <option :value="3">Метод Гаусса</option>
                            <option :value="4">Матричный метод</option>
                        </select>
                        <label
                            for="equation.method"
                            class="select__marker"
                        ></label>
                    </div>
                </div>
            </div>
            <div class="calculators__title calculators__title_small">
                Укажите количество неизвестных величин в системе
            </div>
            <div class="calculators__input-field">
                <div class="form__inner">
                    <div class="form__col form__col_50 calculators__col-number">
                        <div class="form__field">
                            <input
                                id="equation.vars"
                                v-model="$v.equation.vars.$model"
                                type="number"
                                min="2"
                                max="6"
                                class="input input_number"
                                placeholder="0"
                            />
                            <button
                                class="number-btn_rounded number-btn_rounded_minus"
                                :disabled="$v.equation.vars.$model <= 2"
                                @click.prevent="$v.equation.vars.$model = $v.equation.vars.$model - 1"
                            >
                                &minus;
                            </button>
                            <button
                                class="number-btn_rounded number-btn_rounded_plus"
                                :disabled="$v.equation.vars.$model >= 6"
                                @click.prevent="$v.equation.vars.$model = +$v.equation.vars.$model + 1"
                            >
                                &plus;
                            </button>
                        </div>
                    </div>
                    <div class="form__col">
                        <div
                            v-if="$v.equation.vars.$invalid"
                            class="calculators__input-errors"
                        >
                            <span>Количество переменных должно быть от 2 до 6</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="calculators__footer">
                <div class="calculators__title calculators__title_small">
                    Заполните систему линейных уравнений:
                </div>
                <div class="calculators__input-field calculators__input-field_fill calculators__input-field_eq-system">
                    <div
                        v-for="(i, iIdx) in +$v.equation.vars.$model"
                        :key="`row-${iIdx}`"
                        :ref="`row-${iIdx}`"
                        class="calc__row"
                    >
                        <div
                            v-for="(j, jIdx) in +$v.equation.vars.$model - 1"
                            :key="`row-${jIdx}`"
                            class="calc__row"
                        >
                            <input
                                type="text"
                                class="calc__input"
                                placeholder="0"
                            />
                            <div class="calc__letter">
                                <span>x<sub v-html="j"></sub></span><span class="calc__letter_operator">&plus;</span>
                            </div>
                        </div>
                        <input
                            type="text"
                            class="calc__input"
                            placeholder="0"
                        />
                        <div class="calc__letter">
                            <span>x<sub v-html="equation.vars"></sub></span>
                            <span class="calc__letter_operator">&equals;</span>
                        </div>
                        <input
                            type="text"
                            class="calc__input"
                            placeholder="0"
                        />
                    </div>
                </div>
                <div
                    v-if="rowsHasErrors"
                    class="calculators__input-errors"
                >
                    <span>Вводить можно числа или дроби (-2.4, 5/7, ...).</span>
                </div>
                <div class="calculators__submit">
                    <button
                        class="button button_primary"
                        @click.prevent="equationSystem"
                    >
                        Рассчитать
                    </button>
                </div>
            </div>
        </form>
        <!--1014-->
        <form class="calculators__equation-quad" v-if="ex === 1014">
            <div class="calculators__title calculators__title_secondary">
                Введите данные
            </div>
            <div class="calculators__input-field">
                <div
                    :ref="'row-0'"
                    class="calc__array-container"
                >
                    <input
                        type="text"
                        class="calc__input"
                        placeholder="0"
                    />
                    <div class="calc__letter">
                        <span>x<sup>2</sup></span><span class="calc__letter_operator">&plus;</span>
                    </div>
                    <input
                        type="text"
                        class="calc__input"
                        placeholder="0"
                    />
                    <div class="calc__letter">
                        <span>x</span><span class="calc__letter_operator">&plus;</span>
                    </div>
                    <input
                        type="text"
                        class="calc__input"
                        placeholder="0"
                    />
                    <div class="calc__letter">
                        <span class="calc__letter_operator">&equals;</span><span>0</span>
                    </div>
                </div>
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
            </div>
            <div class="calculators__footer">
                <div class="calculators__submit">
                    <button
                        class="button button_primary"
                        @click.prevent="equationQuad"
                    >
                        Рассчитать
                    </button>
                </div>
            </div>
        </form>
        <!--1023-->
        <form class="calculators__vector-pos" v-if="ex === 1023">
            <div class="calculators__title calculators__title_secondary">
                Укажите размерность вектора
            </div>
            <div class="calculators__input-field">
                <div class="form__inner">
                    <div class="form__col form__col_50 calculators__col-number">
                        <label
                            class="form__label"
                            for="vector_size"
                        ></label>
                        <div class="form__field">
                            <input
                                id="vector_size"
                                v-model="v.size"
                                type="number"
                                min="2"
                                max="3"
                                class="input input_number"
                                placeholder="0"
                            />
                            <button
                                class="number-btn_rounded number-btn_rounded_minus"
                                :disabled="v.size <= 2"
                                @click.prevent="v.size = v.size - 1"
                            >
                                &minus;
                            </button>
                            <button
                                class="number-btn_rounded number-btn_rounded_plus"
                                :disabled="v.size >= 3"
                                @click.prevent="v.size = +v.size + 1"
                            >
                                &plus;
                            </button>
                        </div>
                    </div>
                    <div class="form__col">
                        <div
                            v-if="$v.v.size.$invalid"
                            class="calculators__input-errors"
                        >
                            <span>Размерность вектора должна быть 2 или 3</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="calculators__footer">
                <div class="calculators__title calculators__title_small">
                    Начальная точка
                </div>
                <div class="calculators__input-field calculators__input-field_fill">
                    <div class="calc__array-container">
                        <div class="calc__letter">
                            A&nbsp;&equals;
                        </div>
                        <div
                            v-if="!$v.v.size.$invalid"
                            :ref="'row-0'"
                            class="calc__array"
                        >
                            <input
                                v-for="(i, iIdx) in +v.size"
                                :key="`size-i-${iIdx}`"
                                type="text"
                                class="calc__input"
                                placeholder="0"
                            />
                        </div>
                    </div>
                </div>
                <div class="calculators__title calculators__title_small">
                    Конечная точка
                </div>
                <div class="calculators__input-field calculators__input-field_fill">
                    <div class="calc__array-container">
                        <div class="calc__letter">
                            B&nbsp;&equals;
                        </div>
                        <div
                            v-if="!$v.v.size.$invalid"
                            :ref="'row-1'"
                            class="calc__array"
                        >
                            <input
                                v-for="(j, jIdx) in +v.size"
                                :key="`size-j-${jIdx}`"
                                type="text"
                                class="calc__input"
                                placeholder="0"
                            />
                        </div>
                    </div>
                </div>

                <div
                    v-if="hasErrors"
                    class="calculators__input-errors"
                >
                    <span>Вводить можно числа или дроби (-2.4, 5/7, ...).</span>
                </div>
                <div class="calculators__submit">
                    <button
                        class="button button_primary"
                        @click.prevent="vectorPos"
                    >
                        Рассчитать
                    </button>
                </div>
            </div>
        </form>
        <!--1026-->
        <form class="calculators__matrix-det" v-if="ex === 1026">
            <div class="calculators__title calculators__title_secondary">
                Введите данные
            </div>
            <div class="calculators__input-field">
                <div
                    v-for="(v, vIdx) in $v.m.matrix.$each.$iter"
                    :key="`matrix-${vIdx}.size`"
                    class="form__inner"
                >
                    <div
                        v-if="vIdx < 1"
                        class="form__col form__col_50 calculators__col-number"
                    >
                        <label
                            class="form__label"
                            :for="`matrix-${v.$model.label}.rows`"
                        >Число столбцов/строк</label>
                        <div class="form__field">
                            <input
                                :id="`matrix-${v.$model.label}.rows`"
                                :value="v.$model.rows"
                                type="number"
                                :min="v.rows.$params.minValue.min"
                                :max="v.rows.$params.maxValue.max"
                                class="input input_number"
                                placeholder="0"
                                @input="setSize($event.target.value)"
                            />
                            <button
                                class="number-btn_rounded number-btn_rounded_minus"
                                :disabled="v.rows.$model <= v.rows.$params.minValue.min"
                                @click.prevent="setSize(Number(v.$model.rows) - 1)"
                            >
                                &minus;
                            </button>
                            <button
                                class="number-btn_rounded number-btn_rounded_plus"
                                :disabled="v.rows.$model >= v.rows.$params.maxValue.max"
                                @click.prevent="setSize(Number(v.$model.rows) + 1)"
                            >
                                &plus;
                            </button>
                        </div>
                    </div>
                    <div class="form__col">
                        <div
                            v-if="v.$invalid"
                            class="calculators__input-errors"
                        >
                            <span>Размер матрицы должно быть равен в пределе 2 до 7</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="calculators__footer">
                <div class="calculators__title calculators__title_small">
                    Введите значения матрицы
                </div>
                <div class="calculators__input-field calculators__input-field_fill">
                    <div
                        v-for="(v, vIdx) in $v.m.matrix.$each.$iter"
                        :key="`matrix-${vIdx}`"
                    >
                        <div
                            v-if="vIdx < 1"
                            class="calc__array-container"
                        >
                            <div
                                class="calc__letter"
                                v-html="`${v.$model.label}&nbsp;&equals;`"
                            ></div>
                            <div
                                v-if="!v.$invalid"
                                :ref="`matrix-${vIdx}`"
                                class="calc__array"
                            >
                                <div
                                    v-for="(i, iIdx) in +v.rows.$model"
                                    :key="`${v.$model.label}-${i}-${iIdx}`"
                                    class="calc__row"
                                >
                                    <input
                                        v-for="j in +v.cols.$model"
                                        :key="`${v.$model.label}-${j}-${iIdx}`"
                                        type="text"
                                        class="calc__input"
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        v-if="hasErrors"
                        class="calculators__input-errors"
                    >
                        <span>Вводить можно числа или дроби (-2.4, 5/7, ...).</span>
                    </div>
                </div>
                <div class="calculators__submit">
                    <button
                        class="button button_primary"
                        @click.prevent="matrixDet"
                    >
                        Рассчитать
                    </button>
                </div>
            </div>
        </form>
        <!--1033-->
        <form class="calculators__matrix-pow" v-if="ex === 1033">
            <div class="calculators__title calculators__title_secondary">
                Введите данные
            </div>
            <div class="calculators__input-field">
                <div
                    v-for="(v, vIdx) in $v.m.matrix.$each.$iter"
                    :key="`matrix-${vIdx}.size`"
                    class="form__inner"
                >
                    <div
                        v-if="vIdx < 1"
                        class="form__col form__col_50 calculators__col-number"
                    >
                        <label
                            class="form__label"
                            :for="`matrix-${v.$model.label}.rows`"
                        >Число столбцов/строк</label>
                        <div class="form__field">
                            <input
                                :id="`matrix-${v.$model.label}.rows`"
                                :value="v.$model.rows"
                                type="number"
                                :min="v.rows.$params.minValue.min"
                                :max="v.rows.$params.maxValue.max"
                                class="input input_number"
                                placeholder="0"
                                @input="setSize($event.target.value)"
                            />
                            <button
                                class="number-btn_rounded number-btn_rounded_minus"
                                :disabled="v.rows.$model <= v.rows.$params.minValue.min"
                                @click.prevent="setSize(Number(v.$model.rows) - 1)"
                            >
                                &minus;
                            </button>
                            <button
                                class="number-btn_rounded number-btn_rounded_plus"
                                :disabled="v.rows.$model >= v.rows.$params.maxValue.max"
                                @click.prevent="setSize(Number(v.$model.rows) + 1)"
                            >
                                &plus;
                            </button>
                        </div>
                    </div>
                    <div class="form__col">
                        <div
                            v-if="v.$invalid"
                            class="calculators__input-errors"
                        >
                            <span>Размер матрицы должно быть равен в пределе 2 до 7</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="calculators__footer">
                <div class="calculators__title calculators__title_small">
                    Введите значения матрицы
                </div>
                <div class="calculators__input-field calculators__input-field_fill">
                    <div
                        v-for="(v, vIdx) in $v.m.matrix.$each.$iter"
                        :key="`matrix-${vIdx}`"
                    >
                        <div
                            v-if="vIdx < 1"
                            class="calc__array-container"
                        >
                            <div
                                class="calc__letter"
                                v-html="`${v.$model.label}&nbsp;&equals;`"
                            ></div>
                            <div
                                v-if="!v.$invalid"
                                :ref="`matrix-${vIdx}`"
                                class="calc__array"
                            >
                                <div
                                    v-for="(i, iIdx) in +v.rows.$model"
                                    :key="`${v.$model.label}-${i}-${iIdx}`"
                                    class="calc__row"
                                >
                                    <input
                                        v-for="j in +v.cols.$model"
                                        :key="`${v.$model.label}-${j}-${iIdx}`"
                                        type="text"
                                        class="calc__input"
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        v-if="hasErrors"
                        class="calculators__input-errors"
                    >
                        <span>Вводить можно числа или дроби (-2.4, 5/7, ...).</span>
                    </div>
                    <div class="calc__row calc__linear-equation">
                        <div
                            ref="row-0"
                            class="calc__row"
                        >
                            <span class="calc__letter calc__letter_small"><span>A</span></span>
                            <input
                                type="number"
                                class="calc__input calc__input_sup"
                                placeholder="0"
                            />
                        </div>
                    </div>
                </div>
                <div class="calculators__submit">
                    <button
                        class="button button_primary"
                        @click.prevent="matrixPow"
                    >
                        Рассчитать
                    </button>
                </div>
            </div>
        </form>
        <!-- Geomtry all -->
        <form class="calculators__geometry-tris-area" v-if="ex === 2001">
            <div class="calculators__footer">
                <div class="calculators__title calculators__title_small">
                    Введите данные
                </div>
                <div class="calculators__input-field calculators__input-field_fill">
                    <div class="form__inner">
                        <div class="form__col form__col_50">
                            <!-- triangle params inputs -->
                            <div
                                v-if="$v.g.sides != null"
                                class="calc__tris-data"
                            >
                                <template v-for="(param, fieldName) in $v.g.sides.$params">
                                    <div
                                        :key="g.sides[fieldName].name"
                                        class="calc__row"
                                    >
                                        <div class="calc__letter">
                                            <span v-html="g.sides[fieldName].label"></span>
                                            <span class="calc__letter_operator">&equals;</span>
                                        </div>
                                        <input
                                            v-model="$v.g.sides[fieldName].val.$model"
                                            type="text"
                                            class="calc__input"
                                            :class="{ _error: $v.g.sides[fieldName].$error }"
                                            placeholder="0"
                                        />
                                        <!-- dimensions select -->
                                        <div class="calc__select-box">
                                            <select
                                                v-model="g.sides[fieldName].unit"
                                                :id="`g.tris.${fieldName}.unit`"
                                                :name="`gTrisArea${fieldName}Dim`"
                                                class="calc__input select calc__select calc__select_sm"
                                            >
                                                <option
                                                    v-for="option in g.unit"
                                                    :key="`unit-${option.val}`"
                                                    :value="option.val"
                                                    v-html="option.label"
                                                ></option>
                                            </select>
                                            <label
                                                :for="`g.tris.${g.sides[fieldName].val}.unit`"
                                                class="select__marker"
                                            ></label>
                                        </div>
                                    </div>
                                </template>
                            </div>
                            <!-- Ввод угла  -->
                            <div
                                v-if="exId === 2002"
                                class="calc__row"
                            >
                                <div class="calc__letter">
                                    <span v-html="g.angles.a.label"></span>
                                    <span class="calc__letter_operator">&equals;</span>
                                </div>
                                <input
                                    v-model="$v.g.angles.a.val.$model"
                                    :min="$v.g.angles.a.val.$params.between.min"
                                    :max="$v.g.angles.a.val.$params.between.max"
                                    type="number"
                                    class="calc__input"
                                    placeholder="0"
                                />
                            </div>
                            <!-- Высота опущенная на сторону -->
                            <div
                                v-if="exId === 2003"
                                class="calc__row"
                            >
                                <div class="calc__letter">
                                    <span v-html="g.height.label">h</span>
                                    <span class="calc__letter_operator">&equals;</span>
                                </div>
                                <input
                                    v-model="$v.g.height.val.$model"
                                    type="text"
                                    class="calc__input"
                                    placeholder="0"
                                    name="gTrisAreaHeight"
                                />
                                <div class="calc__select-box">
                                    <select
                                        v-model="g.height.unit"
                                        id="g.tris.height.unit"
                                        name="gTrisAreaHeight"
                                        class="calc__input select calc__select calc__select_sm"
                                    >
                                        <option
                                            v-for="option in g.unit"
                                            :key="`unit-${option.val}`"
                                            :value="option.val"
                                            v-html="option.label"
                                        ></option>
                                    </select>
                                    <label
                                        for="g.tris.height.unit"
                                        class="select__marker"
                                    ></label>
                                </div>
                            </div>
                            <!-- Результат в единицах: -->
                            <div class="calc__tris-area-units">
                                <label
                                    class="form__label calc__select-label"
                                    for="g.tris.area.unit"
                                >Площадь в</label>
                                <div class="calc__select-box">
                                    <select
                                        v-model="g.answerUnit"
                                        id="g.tris.area.unit"
                                        name="gTrisAreaDim"
                                        class="calc__input select calc__select calc__select_sm"
                                    >
                                        <option :value="1">м²</option>
                                        <option :value="2">см²</option>
                                        <option :value="3">мм²</option>
                                    </select>
                                    <label
                                        for="g.tris.area.unit"
                                        class="select__marker"
                                    ></label>
                                </div>
                            </div>
                        </div>
                        <div class="form__col form__col_50">
                            <div :class="['calc__triangle', `calc__triangle_${exId}`]"></div>
                        </div>
                    </div>
                    <div
                        v-if="$v.g.$error"
                        class="calculators__input-errors"
                    >
                        <span>Вводить можно числа: a &gt; 0, b &gt; 0</span><br />
                        <span>угол &alpha; должен быть в градусах: 0 &lt; &alpha; &lt; 180</span>
                    </div>
                </div>
                <div class="calculators__submit">
                    <button
                        class="button button_primary"
                        @click.prevent="calcGeometry"
                    >
                        Найти
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>
