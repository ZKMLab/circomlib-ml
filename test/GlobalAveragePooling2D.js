const chai = require("chai");
const path = require("path");

const wasm_tester = require("circom_tester").wasm;

const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);

const assert = chai.assert;

describe("GlobalAveragePooling2D layer test", function () {
    this.timeout(100000000);

    // GlobalAveragePooling with strides==poolSize
    it("(5,5,3) -> (3,)", async () => {
        const INPUT = require("../models/globalAveragePooling2D_input.json");

        const circuit = await wasm_tester(path.join(__dirname, "circuits", "GlobalAveragePooling2D_test.circom"));

        const witness = await circuit.calculateWitness(INPUT, true);

        assert(Fr.eq(Fr.e(witness[0]),Fr.e(1)));
    });
});