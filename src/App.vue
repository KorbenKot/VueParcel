<template>
    <div>
        <input
            type="number"
            class="calc__input"
            placeholder="0"
            style="width: 100px;"
            :value="exId"
            @blur="exId = Number($event.target.value || 0)"
            @keydown.enter="exId = Number($event.target.value || 0)"
        />
        <input
            v-model.number="exId"
            type="number"
            class="calc__input"
            placeholder="0"
            style="width: 100px;"
        />
        <!-- 1023 Вектор по двум точкам -->
        <form class="calculators__vector-pos" v-if="exId === 1023">
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
                    v-if="rowsHasErrors"
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
        <!--answer-->
        <div
            v-show="calcRes.answer"
            id="mathAnswer"
            ref="answer"
            class="calculators__result"
        >
            <div v-if="calcRes.stepByStep > 0">
                <div class="calculators__title calculators__title_small">
                    Решение
                </div>
                <template
                    v-for="(i, iName, iIdx) in calcRes.steps"
                >
                    <div
                        :key="`${iName}-${iIdx}`"
                        class="calculators__step"
                    >
                        <div v-html="i.action"></div>
                        <div
                            class="calculators__result-out"
                            v-html="i.exp"
                        ></div>
                    </div>
                </template>
            </div>
            <div class="calculators__title calculators__title_small">
                Ответ:
            </div>
            <div
                class="calculators__result-out"
                v-html="calcRes.answer"
            ></div>
        </div>
    </div>
</template>

<script>
import {
    required, maxValue, minValue, numeric, between, integer,
} from 'vuelidate/lib/validators';
import http from './api';

// validators
const decimal = val => /^-?\d*([.,]?\d+)?$/.test(val) && val !== '';
const minV = param => (val) => {
    let a = val;

    if (a == null) return false;

    a = a.replace(/[,]/, '.');

    return a > param;
};
const isFraction = (val) => {
    if (val.indexOf('/') >= 0) {
        const arr = val.split('/');

        if (arr.length === 2) {
            return decimal(arr[0]) && decimal(arr[1]);
        }

        return false;
    }

    return false;
};

const properFraction = (val) => {
    if (val.indexOf('/') >= 0) {
        const arr = val.split('/');

        if (arr.length === 2) {
            return arr[0] / arr[1] >= 1;
        }

        return false;
    }

    return true;
};

export default {
    name: 'MainLayout',
    data() {
        return {
            calcRes: {},

            calcErrors: {
                matrix: [],
                array: [],
                rows: {},
            },
            // matrix data
            m: {
                operator: '-',
                matrix: [
                    {
                        label: 'A',
                        rows: 2,
                        cols: 2,
                    },
                    {
                        label: 'B',
                        rows: 2,
                        cols: 2,
                    },
                ],
            },
            // vector data
            v: {
                size: 2,
                operator: '+',
                vector: [
                    {
                        label: 'a',
                        type: 0,
                    },
                    {
                        label: 'b',
                        type: 0,
                    },
                    {
                        label: 'с',
                        type: 0,
                    },
                ],
            },
            // equation data
            equation: {
                method: 1,
                vars: 3,
            },
            // geometry data
            g: {
                answerUnit: 3,
                unit: [
                    { val: 3, label: 'мм' },
                    { val: 2, label: 'см' },
                    { val: 1, label: 'м' },
                ],

                sides: {
                    a: { label: 'a', unit: 3, val: null },
                    b: { label: 'b', unit: 3, val: null },
                    c: { label: 'c', unit: 3, val: null },
                    d: { label: 'd', unit: 3, val: null },
                },

                angles: {
                    a: { label: '&alpha;', val: null },
                    b: { label: '&beta;', val: null },
                    c: { label: '&gamma;', val: null },
                },

                height: { label: 'h', unit: 3, val: null },
            },

            exId: 1006,
        };
    },

    validations() {
        // one side
        if (this.exId === 2012 || this.exId === 2013) {
            return {
                g: {
                    sides: {
                        a: { val: { required, minValue: minV(0), decimal } },
                    },
                },
            };
        }
        // two sides
        if (this.exId === 2010 || this.exId === 2011 || this.exId === 2015) {
            return {
                g: {
                    sides: {
                        a: { val: { required, minValue: minV(0), decimal } },
                        b: { val: { required, minValue: minV(0), decimal } },
                    },
                },
            };
        }
        // three sides
        if (this.exId === 2001) {
            return {
                g: {
                    sides: {
                        a: { val: { required, minValue: minV(0), decimal } },
                        b: { val: { required, minValue: minV(0), decimal } },
                        c: { val: { required, minValue: minV(0), decimal } },
                    },
                },
            };
        }
        // two sides one angle
        if (this.exId === 2002) {
            return {
                g: {
                    sides: {
                        a: { val: { required, minValue: minV(0), decimal } },
                        b: { val: { required, minValue: minV(0), decimal } },
                    },
                    angles: {
                        a: { val: { required, integer, between: between(1, 179) } },
                    },
                },
            };
        }
        // one side one height
        if (this.exId === 2003) {
            return {
                g: {
                    sides: {
                        a: { val: { required, minValue: minV(0), decimal } },
                    },
                    height: { val: { required, minValue: minV(0), decimal } },
                },
            };
        }
        // one diagonal
        if (this.exId === 2014) {
            return {
                g: {
                    sides: {
                        d: { val: { required, minValue: minV(0), decimal } },
                    },
                },
            };
        }
        // default validator params
        return {
            m: {
                matrix: {
                    $each: {
                        rows: {
                            required,
                            numeric,
                            minValue: minValue(2),
                            maxValue: maxValue(7),
                        },
                        cols: {
                            required,
                            numeric,
                            minValue: minValue(2),
                            maxValue: maxValue(7),
                        },
                    },
                },
            },

            v: {
                size: {
                    required,
                    numeric,
                    minValue: minValue(2),
                    maxValue: maxValue(3),
                },
                vector: {
                    $each: {
                        type: {
                            required,
                            numeric,
                            minValue: minValue(0),
                            maxValue: maxValue(1),
                        },
                    },
                },
            },

            equation: {
                vars: {
                    required,
                    numeric,
                    minValue: minValue(2),
                    maxValue: maxValue(6),
                },
            },

            g: {
                sides: {},
                height: {},
                angles: {},
            },
        };
    },

    computed: {
        rowsHasErrors() {
            let res = false;

            Object.keys(this.calcErrors.rows).forEach((e) => {
                if (Object.hasOwnProperty.call(this.calcErrors.rows, e)) {
                    if (this.calcErrors.rows[e].length > 0) {
                        res = res || true;
                    }
                }
            });

            return res;
        },

        hasErrors() {
            let res = false;

            Object.keys(this.calcErrors).forEach((e) => {
                if (Object.hasOwnProperty.call(this.calcErrors, e)) {
                    if (this.calcErrors[e].length > 0) {
                        this.calcErrors[e].forEach((j) => {
                            res = res || j.length > 0;
                        });
                    }
                }
            });

            return res;
        },

        geometrySerialize() {
            let res = '';
            // attaching two sides
            if (this.exId === 2001
                || this.exId === 2002
                || this.exId === 2010
                || this.exId === 2011
                || this.exId === 2012
                || this.exId === 2013
                || this.exId === 2015) {
                res += `[${this.g.sides.a.val},${this.g.sides.a.unit}]`;
            }
            // attaching a second side
            if (this.exId === 2001
                || this.exId === 2002
                || this.exId === 2010
                || this.exId === 2011
                || this.exId === 2015) {
                res += `,[${this.g.sides.b.val},${this.g.sides.b.unit}]`;
            }
            // attaching a third side
            if (this.exId === 2001) {
                res += `,[${this.g.sides.c.val},${this.g.sides.c.unit}]`;
            }
            // attaching an angle
            if (this.exId === 2002) {
                res += `..[${this.g.angles.a.val}]`;
            }
            // attaching a height side
            if (this.exId === 2003) {
                res += `[${this.g.height.val},${this.g.height.unit}]`;
            }
            // attaching a diagonal
            if (this.exId === 2014) {
                res += `[${this.g.sides.d.val},${this.g.sides.d.unit}]`;
            }
            // attaching a result unit
            res += `..[${this.g.answerUnit}]`;

            return res;
        },
        // 1004
        vectorMethod() {
            if (this.v.vector[0].type === 0 && this.v.vector[1].type === 0) {
                return 0;
            }

            if (this.v.vector[0].type === 1 && this.v.vector[1].type === 0) {
                return 2;
            }

            if (this.v.vector[0].type === 0 && this.v.vector[1].type === 1) {
                return 3;
            }

            return 1;
        },
    },

    methods: {
        setSize(e, type = 'rows', idx = 0) {
            // const MIN = this.$v.m.matrix.$each[idx][type].$params.minValue.min;
            // const MAX = this.$v.m.matrix.$each[idx][type].$params.maxValue.max;
            const V = Number(e);

            this.$v.m.matrix.$each[idx][type].$touch();

            // if (V != null && V >= MIN && V <= MAX) {
            this.m.matrix[idx][type] = V;
            this.m.matrix[idx].cols = V;
            // }
        },

        hasErrorsByName(name, idx) {
            const { [name]: EL = [] } = this.calcErrors;

            if (EL.length > 0) {
                return EL[idx] != null ? EL[idx].length > 0 : false;
            }

            return false;
        },

        calculate(data) {
            if (!this.hasErrors) {
                this.calcRes = {};
                this.getAnswer(data);
            }
        },

        fieldsIter(fields, elName) {
            const RES = [];

            for (let j = 0; j < fields.length; j++) {
                const EL = fields[j].value.trim();

                // validation of each cell
                if (EL === '') {
                    RES.push(0);
                } else if (decimal(EL) || isFraction(EL)) {
                    RES.push(EL.replace(/,/g, '.'));
                } else {
                    this.calcErrors.rows[elName].push(j + 1);
                    RES.push(null);
                }
            }

            return RES;
        },

        rowsSerialize(idx = 0) {
            const EL_NAME = `row-${idx}`;
            const INPUT_CLASS_NAME = 'calc__input';
            const REF = this.$refs[EL_NAME] || [];
            const RES = [];

            // set and reset errors
            this.$set(this.calcErrors.rows, EL_NAME, []);

            // if ref is a element
            if (REF.length == null) {
                return this.fieldsIter(Array.from(REF.getElementsByClassName(INPUT_CLASS_NAME)), EL_NAME);
            }

            // if ref is a array
            if (REF.length > 0) {
                for (let i = 0; i < REF.length; i++) {
                    const FIELDS = Array.from(REF[i].getElementsByClassName(INPUT_CLASS_NAME));

                    RES[i] = this.fieldsIter(FIELDS, EL_NAME);
                }

                return RES;
            }

            this.calcErrors.rows[EL_NAME].push('Отсутствуют элементы');
            return null;
        },

        arraySerialize(idx = 0) {
            const REF = this.$refs[`row-${idx}`];
            const FIELDS = Array.from(REF.getElementsByTagName('input'));
            const RES = [];

            this.calcErrors.array.splice(idx, 1, []);

            if (FIELDS.length > 0) {
                for (let i = 0; i < FIELDS.length; i++) {
                    const EL = FIELDS[i].value.trim();

                    // validation of each cell
                    if (EL === '') {
                        RES.push(0);
                    } else if (decimal(EL) || isFraction(EL)) {
                        RES.push(EL.replace(/,/g, '.'));
                    } else {
                        this.calcErrors.array[idx].push(i + 1);
                        RES.push(null);
                    }
                }
            } else {
                this.calcErrors.array[idx].push('Отсутствует элемент');
            }

            return RES;
        },

        objToArray(obj) {
            let res = '';

            Object.keys(obj).forEach((e) => {
                if (Object.prototype.hasOwnProperty.call(obj, e)) {
                    res += `${obj[e]},`;
                }
            });

            return res.slice(0, -1);
        },

        matrixSerialize(idx = 0) {
            const MATRIX = this.$v.m.matrix.$each.$iter[idx].$model;
            const REF = this.$refs[`matrix-${idx}`] || [];
            let fields = [];

            if (REF.length > 0) {
                fields = Array.from(REF[0].getElementsByTagName('input'));
            } else if (REF.length !== 0) {
                fields = Array.from(REF.getElementsByTagName('input'));
            }

            this.calcErrors.matrix.splice(idx, 1, []);

            if (fields.length > 0) {
                const RES = [];
                let iter = 0;

                for (let i = 0; i < MATRIX.rows; i++) {
                    RES.push([]);
                    for (let j = iter; j < MATRIX.cols + iter; j++) {
                        const EL = fields[j].value.trim();

                        // validation of each cell
                        if (EL === '') {
                            RES[i].push(0);
                        } else if (decimal(EL) || isFraction(EL)) {
                            RES[i].push(EL.replace(/,/g, '.'));
                        } else {
                            this.calcErrors.matrix[idx].push(j + 1);
                            RES[i].push(null);
                        }
                        // if (contains('^')(EL) || !decimal(EL) || !improperFraction(EL)) {
                        //     this.calcError[m].status = true;
                        //     this.calcError[m].list.push(j + 1);
                        // } else arr[i].push(EL || 0);
                    }

                    iter += MATRIX.cols;
                }

                return JSON.stringify(RES).replace(/["]+/g, '');
            }

            this.calcErrors.matrix[idx].push('Отсутствует элемент');
            return undefined;
        },

        matrixNumberMult() {
            const EX_ID = '1001';
            const MATRIX = this.matrixSerialize(0);
            const C = this.arraySerialize(0);

            this.calculate(`exid=${EX_ID}?example=${C}*${MATRIX}`);
        },

        matrixMult() {
            const EX_ID = '1002';
            const MATRIX_1 = this.matrixSerialize(0);
            const MATRIX_2 = this.matrixSerialize(1);

            this.calculate(`exid=${EX_ID}?example=${MATRIX_1}*${MATRIX_2}`);
        },

        vectorProductToNumber() {
            const EX_ID = '1003';
            const V_0 = (this.v.vector[0].type === 0
                ? `[${this.rowsSerialize(0)}]` : `[[${this.rowsSerialize(0)}],[${this.rowsSerialize(1)}]]`);
            const [C] = (this.v.vector[0].type === 0 ? this.rowsSerialize(1) : this.rowsSerialize(2));

            if (!this.rowsHasErrors) {
                this.calculate(`exid=${EX_ID}?example=${C}*${V_0}&method=${this.v.vector[0].type}`);
            }
        },

        vectorAngleBetween() {
            const EX_ID = '1004';
            const V_0 = (this.v.vector[0].type === 0
                ? `[${this.rowsSerialize(0)}]` : `[[${this.rowsSerialize(0)}],[${this.rowsSerialize(1)}]]`);
            const V_1 = (this.v.vector[1].type === 0
                ? `[${this.rowsSerialize(2)}]` : `[[${this.rowsSerialize(2)}],[${this.rowsSerialize(3)}]]`);

            if (!this.rowsHasErrors) {
                this.calculate(`exid=${EX_ID}?example=${V_0}..${V_1}&method=${this.vectorMethod}`);
            }
        },

        matrixTranspose() {
            const EX_ID = '1005';
            const MATRIX_1 = this.matrixSerialize(0);

            this.calculate(`exid=${EX_ID}?example=${MATRIX_1}`);
        },

        vectorMixedProduct() {
            const EX_ID = '1006';
            let combinedCoords = [];

            for (let i = 0; i < this.v.vector.length; i++) {
                let [coords] = this.rowsSerialize(i);

                if (this.v.vector[i].type === 1) {
                    coords = `[${coords.slice(0, coords.length / 2)}],[${coords.slice(coords.length / 2)}]`;
                }

                combinedCoords.push(`[${coords}]`);
            }

            combinedCoords = combinedCoords.join('..');

            if (!this.rowsHasErrors) {
                this.calculate(`exid=${EX_ID}?example=${combinedCoords}`);
            }
        },

        matrixSum() {
            const EX_ID = '1007';
            const MATRIX_1 = this.matrixSerialize(0);
            const MATRIX_2 = this.matrixSerialize(1);
            const C_1 = this.arraySerialize(0)[0] || 1;
            const C_2 = this.arraySerialize(1)[0] || 1;
            const OPERATOR = encodeURIComponent(this.m.operator) || '%2B';

            this.calculate(`exid=${EX_ID}?example=${C_1}*${MATRIX_1}${OPERATOR}${C_2}*${MATRIX_2}`);
        },

        equationSystem() {
            const EX_ID = '1013';
            const METHOD = this.equation.method;
            const collapsedVars = [];

            for (let i = 0; i < this.equation.vars; i++) {
                collapsedVars.push(`[${this.rowsSerialize(i)}]`);
            }

            if (!this.rowsHasErrors) {
                this.calculate(`exid=${EX_ID}?example=[${collapsedVars}]&method=${METHOD}`);
            }
        },

        equationQuad() {
            const EX_ID = '1014';
            const VARS = this.arraySerialize(0);

            this.calculate(`exid=${EX_ID}?example=[${VARS}]`);
        },

        vectorPos() {
            const EX_ID = '1023';
            const POINT_1 = this.rowsSerialize(0);
            const POINT_2 = this.rowsSerialize(1);

            if (!this.rowsHasErrors) {
                this.calculate(`exid=${EX_ID}?example=[[${POINT_1}],[${POINT_2}]]`);
            }
        },

        matrixDet() {
            const EX_ID = '1026';
            const MATRIX = this.matrixSerialize(0);

            this.calculate(`exid=${EX_ID}?example=${MATRIX}`);
        },

        matrixPow() {
            const EX_ID = '1033';
            const MATRIX = this.matrixSerialize(0);
            const C = this.arraySerialize(0);

            this.calculate(`exid=${EX_ID}?example=${MATRIX},${C}`);
        },

        calcGeometry() {
            this.$v.g.$touch();

            if (!this.$v.$invalid) {
                this.calculate(`exid=${this.exId}?example=${this.geometrySerialize}`);
            }
        },

        getAnswer(payload) {
            console.info('PAYLOAD: ', payload);
            http.createRequest('get', payload)
                .then((res) => {
                    this.calcRes = res.data;
                });
        },
    },
};
</script>

<style>
.calculators__col-number .input {
    text-align: center;
    background-color: #fff;
}

.number-btn_rounded_minus {
    left: 12px;
}

.number-btn_rounded_plus {
    right: 12px;
}

.calculators__col-number {
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
}

.calculators__col-number .form__field {
    flex: 0 0 110px;
}

.form__field {
    position: relative;
    border-radius: 6px;
    border: 1px solid rgba(72,76,82,.14);
    background-color: #f8f8f8;
    color: #000;
}

input {
    position: relative;
    display: block;
    width: 100%;
    margin: 0;
    padding: 10px;
    color: #484c52;
    font-weight: 400;
    line-height: normal;
    border-radius: inherit;
    border: none;
    transition: border-color 0.3s;
    -webkit-appearance: none;
    font-size: 0.875rem;
    text-align: center;
    background-color: #fff;
}

.number-btn_rounded {
    cursor: pointer;
    position: absolute;
    top: 50%;
    padding: 0;
    width: 22px;
    height: 22px;
    min-width: 22px;
    line-height: 1.375rem;
    border: none;
    border-radius: 50%;
    background: #ddf2f8;
    color: #22a9d3;
    font-weight: 800;
    font-size: .875rem;
    transform: translateY(-50%);
    transition: all .3s;
    z-index: 1;
}

.calculators__input-field {
    margin: 20px 0 30px;
}

.form__inner {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: flex-start;
    margin: -7.5px;
    text-align: left;
}

.calculators__input-field_fill {
    padding: 10px;
    margin-right: 0;
    background: #f2f3f3;
    border-radius: 10px;
    overflow-x: auto;
}

.calculators__input-field {
    margin: 20px 0 30px;
}

.calc__array-container {
    display: flex;
    align-items: center;
    overflow-x: auto;
}

.calc__letter:not(:last-child) {
    padding-right: 5px;
}

.calc__array {
    padding-left: 5px;
}

.calc__row {
    display: flex;
}

.calc__row_center {
    flex-direction: column;
}

.calc__row_center > .calc__col_auto:not(:last-child) {
    margin-bottom: 30px;
}

.calc {

    &__array-container {

        & + & {
            margin-top: 25px;

            @media (--tablet) {
                margin-top: 50px;
            }
        }
    }

    &__row {

        &_conus {
            flex-direction: column;

            @media (--mobile) {
                flex-direction: row;
            }
        }

        &_power {
            justify-content: center;
            align-items: flex-start;

            @media (--mobile) {
                justify-content: flex-start;
            }

            & .calc__input_wide-number {
                margin-top: 45px;
            }
        }

        & + & + .calc__input {
            margin-left: 5px;

            @media (--tablet) {
                margin-left: 10px;
            }
        }
    }

    &__col {
        display: flex;
        flex-direction: column;

        &_auto {

            @media (--mobile) {
                flex: 0 1 auto;
                width: auto;
                max-width: none;
            }
        }

        &_data {

            & > .calc__row:not(:last-child) {
                margin-bottom: 30px;

                @media (--mobile) {
                    margin-bottom: 20px;
                }
            }
        }

        &_conus {
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;

            @media (--mobile) {
                flex-direction: column;
                align-items: flex-start;
            }

            & + & {

                @media (--mobile) {
                    margin-left: 60px;
                }
            }

            & .calc__row {
                margin-right: 5px;

                @media (--mobile) {
                    margin: 0 0 5px;
                }
            }
        }
    }

    &__input {
        display: inline-block;
        width: 35px;
        min-height: 30px;
        background-color: #fff;
        border: 1px solid rgba(72,76,82,.14);
        border-radius: 6px;
        text-align: center;
        font-weight: 400;
        font-size: 1rem;
        line-height: 1.6875rem;
        color: #7f8286;
        padding: 10px;
        margin: 5px;

        &_wide-number {
            max-width: 110px;
            width: 100%;
            margin: 0;
        }

        &_sup {
            margin: 0 5px;
            padding: 5px;
            width: 40px;
            transform: translateY(-30px);
        }

        & + .calc__letter {

            @media (--tablet) {
                padding-left: 5px;
            }
        }
    }

    &__input-descr {
        font-size: 14px;
        font-weight: 600;
        color: #a0a2a5;

        & + .calc__input {
            margin: 15px 0 0;
            max-width: none;
            width: 100%;
            text-align: left;

            @media (--mobile) {
                margin: 0 0 0 15px;
                width: 110px;
            }
        }
    }

    &__select {
        min-width: 220px;
        width: unset;
        text-align: left;

        &_sm {
            min-width: 80px;
        }

        &_action {
            min-width: 80px;
            font-size: 30px;
            padding-left: 25px;
        }
    }

    &__select-label {
        font-size: 16px;

        @media (--tablet) {
            font-size: 18px;
        }
    }

    &__select-box {
        position: relative;
        display: inline-block;

        &_operator {
            margin: 0 10px;

            & .calc__input {
                margin: 0;
            }
        }
    }

    &__letter {
        display: flex;
        align-items: center;
        font-size: 25px;
        line-height: 32px;
        color: #474b52;
        white-space: nowrap;

        @media (--tablet) {
            font-size: 40px;
            line-height: 40px;
        }

        &:not(:last-child) {

            @media (--tablet) {
                padding-right: 5px;
            }
        }

        & sup, & sub {
            font-size: 14px;
            line-height: 18px;
            color: #484C52;

            @media (--tablet) {
                font-size: 20px;
                line-height: 26px;
            }
        }

        & span {
            display: inline-block;

            & + span {
                padding-left: 4px;

                @media (--tablet) {
                    padding-left: 10px;
                }
            }
        }

        &_operator {
            color: #a3a5a8;
            font-weight: 800;
        }

        &_small {
            font-size: 20px;
            line-height: 26px;

            @media (--tablet) {
                font-size: 30px;
                line-height: 36px;
            }
        }
    }

    &__letter-vector {
        position: relative;
        display: inline-block;

        &::before {
            content: "";
            width: 100%;
            height: 2px;
            background-color: #474b52;
            position: absolute;
            left: 0;
            top: 0;

            @media (--tablet) {
                height: 4px;
            }
        }
    }

    &__linear-equation {
        align-items: center;
        justify-content: center;
        margin-top: 35px;

        @media (--tablet) {
            margin-top: 30px;
        }
    }

    &__action-block {
        display: flex;
        align-items: center;
        margin-left: 15px;
        margin-right: 10px;
    }

    &__action {
        display: inline-block;
        margin: 5px;
        border: none;
        outline: none;
        border-radius: 50%;
        background: #a3a5a8;
        color: #fff;
        font-weight: 800;
        width: 16px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        transition: all .3s;
        cursor: pointer;
        padding: 0;

        &._active {
            transform: scale(1.5);
            background-color: #21aad4;
        }

        & span {
            position: relative;
            top: -0.2px;
        }
    }

    &__tris-data {
        padding-left: 30px;

        @media (--mobile) {
            padding-left: 0;
        }
    }

    &__tris-area-units {
        margin-top: 15px;

        @media (--mobile) {
            margin-top: 40px;
        }
    }
}

.calc__array {
    padding-left: 10px;
}

._error {
    border: 1px solid #ff7f50;
}

</style>
