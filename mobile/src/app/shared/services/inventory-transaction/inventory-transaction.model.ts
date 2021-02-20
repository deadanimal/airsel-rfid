export class InventoryTransactionModel {
  public id: string;
  public ORGANIZATION_CODE: string;
  public SOURCE_CODE: string;
  public SOURCE_HEADER_ID: string;
  public TRANSACTION_DATE: string;
  public SOURCE_LINE_ID: string;
  public TRANSACTION_COST_IDENTIFIER: string;
  public ITEM_NUMBER: string;
  public SUBINVENTORY_CODE: string;
  public TRANSACTION_QUANTITY: string;
  public TRANSACTION_UOM: string;
  public TRANSACTION_TYPE_NAME: string;
  public TRANSACTION_REFERENCE: string;
  public USE_CURRENT_COST: string;
  public COST_COMPONENT_CODE: string;
  public COST: string;

  constructor(
    id: string,
    ORGANIZATION_CODE: string,
    SOURCE_CODE: string,
    SOURCE_HEADER_ID: string,
    TRANSACTION_DATE: string,
    SOURCE_LINE_ID: string,
    TRANSACTION_COST_IDENTIFIER: string,
    ITEM_NUMBER: string,
    SUBINVENTORY_CODE: string,
    TRANSACTION_QUANTITY: string,
    TRANSACTION_UOM: string,
    TRANSACTION_TYPE_NAME: string,
    TRANSACTION_REFERENCE: string,
    USE_CURRENT_COST: string,
    COST_COMPONENT_CODE: string,
    COST: string
  ) {
    this.id = id;
    this.ORGANIZATION_CODE = ORGANIZATION_CODE;
    this.SOURCE_CODE = SOURCE_CODE;
    this.SOURCE_HEADER_ID = SOURCE_HEADER_ID;
    this.TRANSACTION_DATE = TRANSACTION_DATE;
    this.SOURCE_LINE_ID = SOURCE_LINE_ID;
    this.TRANSACTION_COST_IDENTIFIER = TRANSACTION_COST_IDENTIFIER;
    this.ITEM_NUMBER = ITEM_NUMBER;
    this.SUBINVENTORY_CODE = SUBINVENTORY_CODE;
    this.TRANSACTION_QUANTITY = TRANSACTION_QUANTITY;
    this.TRANSACTION_UOM = TRANSACTION_UOM;
    this.TRANSACTION_TYPE_NAME = TRANSACTION_TYPE_NAME;
    this.TRANSACTION_REFERENCE = TRANSACTION_REFERENCE;
    this.USE_CURRENT_COST = USE_CURRENT_COST;
    this.COST_COMPONENT_CODE = COST_COMPONENT_CODE;
    this.COST = COST;
  }
}
