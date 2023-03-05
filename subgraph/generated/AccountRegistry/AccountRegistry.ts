// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class AccountCreated extends ethereum.Event {
  get params(): AccountCreated__Params {
    return new AccountCreated__Params(this);
  }
}

export class AccountCreated__Params {
  _event: AccountCreated;

  constructor(event: AccountCreated) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get tokenContract(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class AccountRegistry extends ethereum.SmartContract {
  static bind(address: Address): AccountRegistry {
    return new AccountRegistry("AccountRegistry", address);
  }

  account(tokenCollection: Address, tokenId: BigInt): Address {
    let result = super.call("account", "account(address,uint256):(address)", [
      ethereum.Value.fromAddress(tokenCollection),
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toAddress();
  }

  try_account(
    tokenCollection: Address,
    tokenId: BigInt
  ): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "account",
      "account(address,uint256):(address)",
      [
        ethereum.Value.fromAddress(tokenCollection),
        ethereum.Value.fromUnsignedBigInt(tokenId)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  account1(
    chainId: BigInt,
    tokenCollection: Address,
    tokenId: BigInt
  ): Address {
    let result = super.call(
      "account",
      "account(uint256,address,uint256):(address)",
      [
        ethereum.Value.fromUnsignedBigInt(chainId),
        ethereum.Value.fromAddress(tokenCollection),
        ethereum.Value.fromUnsignedBigInt(tokenId)
      ]
    );

    return result[0].toAddress();
  }

  try_account1(
    chainId: BigInt,
    tokenCollection: Address,
    tokenId: BigInt
  ): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "account",
      "account(uint256,address,uint256):(address)",
      [
        ethereum.Value.fromUnsignedBigInt(chainId),
        ethereum.Value.fromAddress(tokenCollection),
        ethereum.Value.fromUnsignedBigInt(tokenId)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  createAccount(tokenCollection: Address, tokenId: BigInt): Address {
    let result = super.call(
      "createAccount",
      "createAccount(address,uint256):(address)",
      [
        ethereum.Value.fromAddress(tokenCollection),
        ethereum.Value.fromUnsignedBigInt(tokenId)
      ]
    );

    return result[0].toAddress();
  }

  try_createAccount(
    tokenCollection: Address,
    tokenId: BigInt
  ): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "createAccount",
      "createAccount(address,uint256):(address)",
      [
        ethereum.Value.fromAddress(tokenCollection),
        ethereum.Value.fromUnsignedBigInt(tokenId)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  createAccount1(
    chainId: BigInt,
    tokenCollection: Address,
    tokenId: BigInt
  ): Address {
    let result = super.call(
      "createAccount",
      "createAccount(uint256,address,uint256):(address)",
      [
        ethereum.Value.fromUnsignedBigInt(chainId),
        ethereum.Value.fromAddress(tokenCollection),
        ethereum.Value.fromUnsignedBigInt(tokenId)
      ]
    );

    return result[0].toAddress();
  }

  try_createAccount1(
    chainId: BigInt,
    tokenCollection: Address,
    tokenId: BigInt
  ): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "createAccount",
      "createAccount(uint256,address,uint256):(address)",
      [
        ethereum.Value.fromUnsignedBigInt(chainId),
        ethereum.Value.fromAddress(tokenCollection),
        ethereum.Value.fromUnsignedBigInt(tokenId)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  implementation(): Address {
    let result = super.call("implementation", "implementation():(address)", []);

    return result[0].toAddress();
  }

  try_implementation(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "implementation",
      "implementation():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _implementation(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class CreateAccountCall extends ethereum.Call {
  get inputs(): CreateAccountCall__Inputs {
    return new CreateAccountCall__Inputs(this);
  }

  get outputs(): CreateAccountCall__Outputs {
    return new CreateAccountCall__Outputs(this);
  }
}

export class CreateAccountCall__Inputs {
  _call: CreateAccountCall;

  constructor(call: CreateAccountCall) {
    this._call = call;
  }

  get tokenCollection(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class CreateAccountCall__Outputs {
  _call: CreateAccountCall;

  constructor(call: CreateAccountCall) {
    this._call = call;
  }

  get value0(): Address {
    return this._call.outputValues[0].value.toAddress();
  }
}

export class CreateAccount1Call extends ethereum.Call {
  get inputs(): CreateAccount1Call__Inputs {
    return new CreateAccount1Call__Inputs(this);
  }

  get outputs(): CreateAccount1Call__Outputs {
    return new CreateAccount1Call__Outputs(this);
  }
}

export class CreateAccount1Call__Inputs {
  _call: CreateAccount1Call;

  constructor(call: CreateAccount1Call) {
    this._call = call;
  }

  get chainId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get tokenCollection(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class CreateAccount1Call__Outputs {
  _call: CreateAccount1Call;

  constructor(call: CreateAccount1Call) {
    this._call = call;
  }

  get value0(): Address {
    return this._call.outputValues[0].value.toAddress();
  }
}
