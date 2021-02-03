import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import Dropzone from "dropzone";
import swal from "sweetalert2";
import * as XLSX from 'xlsx';
// import { NgxSpinnerService } from "ngx-spinner";
import { NgxSpinnerService } from "ngx-spinner";

import { AssetsService } from "src/app/shared/services/assets/assets.service";
import { AssetGroupsService } from "src/app/shared/services/asset-groups/asset-groups.service";
import { AssetTypesService } from "src/app/shared/services/asset-types/asset-types.service";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { OrganisationsService } from "src/app/shared/services/organisations/organisations.service";
import { RegionsService } from "src/app/shared/services/regions/regions.service";
import { NotifyService } from "src/app/shared/handler/notify/notify.service";
import { AssetsRegistrationService } from 'src/app/shared/services/assets-registration/assets-registration.service';
import { AssetsLocationService } from 'src/app/shared/services/assets-location/assets-location.service';
import { AssetsAttributeService } from 'src/app/shared/services/assets-attribute/assets-attribute.service';
import { AssetAttributeColumnService } from 'src/app/shared/services/asset-attribute-column/asset-attribute-column.service';

import { system } from '@amcharts/amcharts4/core';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
})
export class RegistrationComponent implements OnInit {
  // Stepper
  isLinear = false;
  isDisableRipple = true;

  // Tabs
  firstTab: boolean = true
  secondTab: boolean = false
  thirdTab: boolean = false

  tempFileName = false;
  resOnkeyData: any

  // escell data
  dataFromExcelFile = [];
  storeData: any;
  worksheet: any;
  fileUploaded: File;
  jsonData: any;
  data: [][]
  // onFileChange(event) {
  //   this.fileUploaded = event.target.files[0];
  //   this.readExcel();
  // }

  // Modal
  modal: BsModalRef;
  modalViewAsset: BsModalRef;
  modalRegisterAsset: BsModalRef;
  ModalAssetAttribute: BsModalRef;
  modalEditAsset: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered modal-xl",
    ignoreBackdropClick: true,
  };
  modalConfigUpload = {
    keyboard: true,
    class: "modal-dialog-centered modal-sm",
    ignoreBackdropClick: true,
  };
  modalViewAssetConfig = {
    keyboard: true,
    class: "modal-dialog-centered modal-sm",
    ignoreBackdropClick: true,
  };

  focusSearch;

  // Selection
  regions = [];
  organisations = [];
  assetprimarycategory = [
    { value: "ACTUATOR", name: "ACTUATOR" },
    { value: "ADVANCED PILOT VALVE", name: "ADVANCED PILOT VALVE" },
    { value: "AIR BLOWER", name: "AIR BLOWER" },
    { value: "AIR CIRCUIT BREAKER", name: "AIR CIRCUIT BREAKER" },
    { value: "AIR COMPRESSOR", name: "AIR COMPRESSOR" },
    { value: "AIR RECEIVER TANK", name: "AIR RECEIVER TANK" },
    { value: "AIR VALVE", name: "AIR VALVE" },
    { value: "ALTERNATOR", name: "ALTERNATOR" },
    { value: "ALTITUDE VALVE", name: "ALTITUDE VALVE" },
    { value: "AMR FLOWMETER", name: "AMR FLOWMETER" },
    { value: "ANALOG INPUT MODULE", name: "ANALOG INPUT MODULE" },
    { value: "ANALOG OUTPUT MODULE", name: "ANALOG OUTPUT MODULE" },
    { value: "AUTOCLAVE", name: "AUTOCLAVE" },
    { value: "AUTO TITRATOR WITH AUTO SAMPLER", name: "AUTO TITRATOR WITH AUTO SAMPLER" },
    { value: "BACK PRESSURE VALVE", name: "BACK PRESSURE VALVE" },
    { value: "BALANCING RESERVOIR", name: "BALANCING RESERVOIR" },
    { value: "BALL FLOAT VALVE", name: "BALL FLOAT VALVE" },
    { value: "BALL VALVE", name: "BALL VALVE" },
    { value: "BANDSCREEN", name: "BANDSCREEN" },
    { value: "BATTERY CHARGER", name: "BATTERY CHARGER" },
    { value: "BIN ACTIVATOR", name: "BIN ACTIVATOR" },
    { value: "BIOLOGICAL OXYGEN DEMAND APPARATUS", name: "BIOLOGICAL OXYGEN DEMAND APPARATUS" },
    { value: "BOAT ENGINE", name: "BOAT ENGINE" },
    { value: "BUILDING", name: "BUILDING" },
    { value: "BULK METER", name: "BULK METER" },
    { value: "BUTTERFLY VALVE", name: "BUTTERFLY VALVE" },
    { value: "CABINET", name: "CABINET" },
    { value: "CAMERA", name: "CAMERA" },
    { value: "CAPACITOR BANK", name: "CAPACITOR BANK" },
    { value: "CENTRAL PROCESSING UNIT MODULE", name: "CENTRAL PROCESSING UNIT MODULE" },
    { value: "CHAIN BLOCK", name: "CHAIN BLOCK" },
    { value: "CHECK VALVE", name: "CHECK VALVE" },
    { value: "CHAMBER", name: "CHAMBER" },
    { value: "CHECK VALVE", name: "CHECK VALVE" },
    { value: "CHLORGUARD", name: "CHLORGUARD" },
    { value: "CHLORINATOR", name: "CHLORINATOR" },
    { value: "CHLORINE VALVE", name: "CHLORINE VALVE" },
    { value: "CLARIFIER", name: "CLARIFIER" },
    { value: "COLORIMETER", name: "COLORIMETER" },
    { value: "CONDUCTIVITY METER", name: "CONDUCTIVITY METER" },
    { value: "CONSTANT FLOW VALVE", name: "CONSTANT FLOW VALVE" },
    { value: "CONTROL PANEL", name: "CONTROL PANEL" },
    { value: "CONTROL VALVE", name: "CONTROL VALVE" },
    { value: "CONVEYOR", name: "CONVEYOR" },
    { value: "CRANE", name: "CRANE" },
    { value: "DAM CREST", name: "DAM CREST" },
    { value: "DAMPER", name: "DAMPER" },
    { value: "DATA LOGGER", name: "DATA LOGGER" },
    { value: "DECANTER", name: "DECANTER" },
    { value: "DECANTER CENTRIFUDGE", name: "DECANTER CENTRIFUDGE" },
    { value: "DEHUMIDIFIER", name: "DEHUMIDIFIER" },
    { value: "DEIONISED WATER SYSTEM", name: "DEIONISED WATER SYSTEM" },
    { value: "DELIVERY PRESSURE SWITCH", name: "DELIVERY PRESSURE SWITCH" },
    { value: "DEPTH SAMPLER", name: "DEPTH SAMPLER" },
    { value: "DESKTOP COMPUTER", name: "DESKTOP COMPUTER" },
    { value: "DESICCATOR", name: "DESICCATOR" },
    { value: "DIAPHRAGM VALVE", name: "DIAPHRAGM VALVE" },
    { value: "DIFFERENTIAL PRESSURE TRANSMITTER", name: "DIFFERENTIAL PRESSURE TRANSMITTER" },
    { value: "DIFFUSER", name: "DIFFUSER" },
    { value: "DIGITAL INDICATOR", name: "DIGITAL INDICATOR" },
    { value: "DIGITAL INPUT MODULE", name: "DIGITAL INPUT MODULE" },
    { value: "DIGITAL INPUT OR OUTPUT MODULE", name: "DIGITAL INPUT OR OUTPUT MODULE" },
    { value: "DIGITAL OUTPUT MODULE", name: "DIGITAL OUTPUT MODULE" },
    { value: "DISPENSETTE", name: "DISPENSETTE" },
    { value: "DISSOLVED OXYGEN METER", name: "DISSOLVED OXYGEN METER" },
    { value: "DISTILLATOR", name: "DISTILLATOR" },
    { value: "DISTRICT METERING ZONE", name: "DISTRICT METERING ZONE" },
    { value: "DOSER", name: "DOSER" },
    { value: "DRONE", name: "DRONE" },
    { value: "DRUM VALVE", name: "DRUM VALVE" },
    { value: "DUST COLLECTOR", name: "DUST COLLECTOR" },
    { value: "EARTHING SYSTEM", name: "EARTHING SYSTEM" },
    { value: "EJECTOR", name: "EJECTOR" },
    { value: "ELECTRICAL PANEL", name: "ELECTRICAL PANEL" },
    { value: "ELECTROMAGNETIC (EM) FLOWMETER", name: "ELECTROMAGNETIC (EM) FLOWMETER" },
    { value: "ELECTRONIC LEVEL SENSOR", name: "ELECTRONIC LEVEL SENSOR" },
    { value: "ELECTRONIC PRESSURE TRANSMITTER", name: "ELECTRONIC PRESSURE TRANSMITTER" },
    { value: "EVAPORATOR", name: "EVAPORATOR" },
    { value: "EXHAUST FAN", name: "EXHAUST FAN" },
    { value: "FEEDER", name: "FEEDER" },
    { value: "FIRE FIGHTING SYSTEM", name: "FIRE FIGHTING SYSTEM" },
    { value: "FLAT SEAT VALVE", name: "FLAT SEAT VALVE" },
    { value: "FLOCCULATOR", name: "FLOCCULATOR" },
    { value: "FLOW CONTROL VALVE", name: "FLOW CONTROL VALVE" },
    { value: "FOOT VALVE", name: "FOOT VALVE" },
    { value: "FREEZER", name: "FREEZER" },
    { value: "FUME CUPBOARD", name: "FUME CUPBOARD" },
    { value: "GAS CHROMATOGRAPHY-MASS SPECTROMETRY", name: "GAS CHROMATOGRAPHY-MASS SPECTROMETRY" },
    { value: "GATE VALVE", name: "GATE VALVE" },
    { value: "GEAR BOX", name: "GEAR BOX" },
    { value: "GENERATOR SET", name: "GENERATOR SET" },
    { value: "GPS EQUIPMENT", name: "GPS EQUIPMENT" },
    { value: "HEAT EXCHANGER", name: "HEAT EXCHANGER" },
    { value: "HEATING REACTOR", name: "HEATING REACTOR" },
    { value: "HEAVY VEHICLES-BACKHOE LOADER", name: "HEAVY VEHICLES-BACKHOE LOADER" },
    { value: "HEAVY VEHICLE-BUS", name: "HEAVY VEHICLES-BUS" },
    { value: "HEAVY VEHICLES-CARGO LORRY", name: "HEAVY VEHICLES-CARGO LORRY" },
    { value: "HEAVY VEHICLES-LOADER", name: "HEAVY VEHICLES-LOADER" },
    { value: "HEAVY VEHICLES-PRIME MOVER", name: "HEAVY VEHICLES-PRIME MOVER" },
    { value: "HEAVY VEHICLES-TANKER LORRY", name: "HEAVY VEHICLES-TANKER LORRY" },
    { value: "HEAVY VEHICLES-TIPPER LORRY", name: "HEAVY VEHICLES-TIPPER LORRY" },
    { value: "HEAVY VEHICLES-TRAILER JUMBO", name: "HEAVY VEHICLES-TRAILER JUMBO" },
    { value: "HEAVY VEHICLES-TRAILER MACHINE", name: "HEAVY VEHICLES-TRAILER MACHINE" },
    { value: "HOPPER", name: "HOPPER" },
    { value: "HOTPLATE", name: "HOTPLATE" },
    { value: "HUMAN MACHINE INTERFACE-PANEL", name: "HUMAN MACHINE INTERFACE-PANEL" },
    { value: "HYDROMETER", name: "HYDROMETER" },
    { value: "HYDROPHONE", name: "HYDROPHONE" },
    { value: "HYDROPNEUMATIC TANK", name: "HYDROPNEUMATIC TANK" },
    { value: "INCUBATOR", name: "INCUBATOR" },
    { value: "INDUCTIVELY COUPLE PLASMA-MASS SPECTROMETRY", name: "INDUCTIVELY COUPLE PLASMA-MASS SPECTROMETRY" },
    { value: "INDUSTRIAL VEHICLES-COMPACTOR", name: "INDUSTRIAL VEHICLES-COMPACTOR" },
    { value: "INDUSTRIAL VEHICLES-FORKLIFT", name: "INDUSTRIAL VEHICLES-FORKLIFT" },
    { value: "INDUSTRIAL VEHICLES-TRACTOR", name: "INDUSTRIAL VEHICLES-TRACTOR" },
    { value: "INJECTOR", name: "INJECTOR" },
    { value: "INSERTION FLOWMETER", name: "INSERTION FLOWMETER" },
    { value: "INSTRUMENTATION PANEL", name: "INSTRUMENTATION PANEL" },
    { value: "INVERTER", name: "INVERTER" },
    { value: "ION CHROMATOGRAPHY", name: "ION CHROMATOGRAPHY" },
    { value: "JAR TEST", name: "JAR TEST" },
    { value: "LAB BALANCE", name: "LAB BALANCE" },
    { value: "LABORATORY CABINET", name: "LABORATORY CABINET" },
    { value: "LABORATORY CHILLER", name: "LABORATORY CHILLER" },
    { value: "LABORATORY HEATER", name: "LABORATORY HEATER" },
    { value: "LABORATORY OVEN", name: "LABORATORY OVEN" },
    { value: "LAPTOP", name: "LAPTOP" },
    { value: "LEAK DETECTOR", name: "LEAK DETECTOR" },
    { value: "LEVEL ELECTRODE", name: "LEVEL ELECTRODE" },
    { value: "LIGHT VEHICLE-CAR", name: "LIGHT VEHICLE-CAR" },
    { value: "LIGHT VEHICLES-MPV", name: "LIGHT VEHICLES-MPV" },
    { value: "LIGHT VEHICLES-PANEL VAN", name: "LIGHT VEHICLES-PANEL VAN" },
    { value: "LIGHT VEHICLES-PICKUP", name: "LIGHT VEHICLES-PICKUP" },
    { value: "LIGHT VEHICLES-SCHOOL VAN", name: "LIGHT VEHICLES-SCHOOL VAN" },
    { value: "LIGHT VEHICLES-SUV", name: "LIGHT VEHICLES-SUV" },
    { value: "LIGHT VEHICLES-VAN", name: "LIGHT VEHICLES-VAN" },
    { value: "LIGHTING", name: "LIGHTING" },
    { value: "LOAD CELL", name: "LOAD CELL" },
    { value: "LOGGER", name: "LOGGER" },
    { value: "LOW PRESSURE PILOT", name: "LOW PRESSURE PILOT" },
    { value: "MAGNETIC STIRRER", name: "MAGNETIC STIRRER" },
    { value: "MECHANICAL FLOWMETER", name: "MECHANICAL FLOWMETER" },
    { value: "MECHANICAL LEVEL INDICATOR", name: "MECHANICAL LEVEL INDICATOR" },
    { value: "MECHANICAL SCREEN", name: "MECHANICAL SCREEN" },
    { value: "MEMBRANE FILTER", name: "MEMBRANE FILTER" },
    { value: "MICROFILL", name: "MICROFILL" },
    { value: "MICROPIPETTE", name: "MICROPIPETTE" },
    { value: "MICROSCOPE", name: "MICROSCOPE" },
    { value: "MIXER", name: "MIXER" },
    { value: "MODEM", name: "MODEM" },
    { value: "MODULATION VALVE", name: "MODULATION VALVE" },
    { value: "MOISTURE ANALYZER", name: "MOISTURE ANALYZER" },
    { value: "MOTORCYCLES-MOTORCYCLE", name: "MOTORCYCLES-MOTORCYCLE" },
    { value: "MOTOR-SLIP RING", name: "MOTOR-SLIP RING" },
    { value: "MOTOR-SQUIRREL CAGE", name: "MOTOR-SQUIRREL CAGE" },
    { value: "MULTIPARAMETER", name: "MULTIPARAMETER" },
    { value: "NESSLERISER", name: "NESSLERISER" },
    { value: "NITROGEN EVAPORATOR", name: "NITROGEN EVAPORATOR" },
    { value: "OIL TRAP", name: "OIL TRAP" },
    { value: "ONLINE ANALYZER", name: "ONLINE ANALYZER" },
    { value: "PASSENGER HOIST", name: "PASSENGER HOIST" },
    { value: "PENSTOCK", name: "PENSTOCK" },
    { value: "PH METER", name: "PH METER" },
    { value: "PHOTOMETER AND SPECTROMETER", name: "PHOTOMETER AND SPECTROMETER" },
    { value: "PNEUMATIC VALVE", name: "PNEUMATIC VALVE" },
    { value: "POWER SUPPLY MODULE", name: "POWER SUPPLY MODULE" },
    { value: "PRESSURE CHECK UNIT", name: "PRESSURE CHECK UNIT" },
    { value: "PRESSURE CONTROLLER", name: "PRESSURE CONTROLLER" },
    { value: "PRESSURE GAUGE", name: "PRESSURE GAUGE" },
    { value: "PRESSURE REDUCING VALVE", name: "PRESSURE REDUCING VALVE" },
    { value: "PRESSURE RELIEF VALVE", name: "PRESSURE RELIEF VALVE" },
    { value: "PRESSURE SWITCH", name: "PRESSURE SWITCH" },
    { value: "PROGRAMMABLE LOGIC CONTROL", name: "PROGRAMMABLE LOGIC CONTROL" },
    { value: "PUMP HOUSE", name: "PUMP HOUSE" },
    { value: "PUMP MAGNETIC DRIVE", name: "PUMP MAGNETIC DRIVE" },
    { value: "PUMP-CENTRIFUGAL-MULTISTAGE", name: "PUMP-CENTRIFUGAL-MULTISTAGE" },
    { value: "PUMP-CENTRIFUGAL-SELF-PRIMING", name: "PUMP-CENTRIFUGAL-SELF-PRIMING" },
    { value: "PUMP-CENTRIFUGAL-SPLIT CASING", name: "PUMP-CENTRIFUGAL-SPLIT CASING" },
    { value: "PUMP-DRY PIT", name: "PUMP-DRY PIT" },
    { value: "PUMP-END SUCTION", name: "PUMP-END SUCTION" },
    { value: "PUMP-METERING", name: "PUMP-METERING" },
    { value: "PUMP-PNEUMATIC", name: "PUMP-PNEUMATIC" },
    { value: "PUMP-PRESSURE", name: "PUMP-PRESSURE" },
    { value: "PUMP-PROGRESSIVE CAVITY", name: "PUMP-PROGRESSIVE CAVITY" },
    { value: "PUMP-SUBMERSIBLE", name: "PUMP-SUBMERSIBLE" },
    { value: "PUMP-VACCUM", name: "PUMP-VACCUM" },
    { value: "QUANTI TRAY SEALER", name: "QUANTI TRAY SEALER" },
    { value: "RECORDER", name: "RECORDER" },
    { value: "REFRIGERATED AIR DRYER", name: "REFRIGERATED AIR DRYER" },
    { value: "REMOTE TELEMETRY UNIT", name: "REMOTE TELEMETRY UNIT" },
    { value: "RESERVOIR", name: "RESERVOIR" },
    { value: "RIVER GATE", name: "RIVER GATE" },
    { value: "RIVER MONITORING SYSTEM", name: "RIVER MONITORING SYSTEM" },
    { value: "ROTAMETER", name: "ROTAMETER" },
    { value: "SAMPLING STATION", name: "SAMPLING STATION" },
    { value: "SAND FILTER", name: "SAND FILTER" },
    { value: "SCADA PANEL", name: "SCADA PANEL" },
    { value: "SCOUR VALVE", name: "SCOUR VALVE" },
    { value: "SCRAPPER", name: "SCRAPPER" },
    { value: "SERVER", name: "SERVER" },
    { value: "SIEVE", name: "SIEVE" },
    { value: "SILO", name: "SILO" },
    { value: "SIPHON FILTER", name: "SIPHON FILTER" },
    { value: "SLACKER", name: "SLACKER" },
    { value: "SLUICE KNIFE VALVE", name: "SLUICE KNIFE VALVE" },
    { value: "SLUICE VALVE", name: "SLUICE VALVE" },
    { value: "SOLAR CHARGE CONTROLLER", name: "SOLAR CHARGE CONTROLLER" },
    { value: "SOLAR PANEL", name: "SOLAR PANEL" },
    { value: "SOLENOID VALVE", name: "SOLENOID VALVE" },
    { value: "SPRAY NOZZLE", name: "SPRAY NOZZLE" },
    { value: "STATIC SCREEN", name: "STATIC SCREEN" },
    { value: "STOPPER", name: "STOPPER" },
    { value: "STRAINER FILTER", name: "STRAINER FILTER" },
    { value: "STROKE CONTROLLER", name: "STROKE CONTROLLER" },
    { value: "SURGE ANTICIPATING RELIEF VALVE", name: "SURGE ANTICIPATING RELIEF VALVE" },
    { value: "SURGE ANTICIPATING VALVE", name: "SURGE ANTICIPATING VALVE" },
    { value: "SURGE VESSEL", name: "SURGE VESSEL" },
    { value: "SURVEILLANCE CAMERA", name: "SURVEILLANCE CAMERA" },
    { value: "TABLET", name: "TABLET" },
    { value: "TACHOMETER", name: "TACHOMETER" },
    { value: "THICKENER", name: "THICKENER" },
    { value: "TITRATOR", name: "TITRATOR" },
    { value: "TOTAL ORGANIC CARBON (TOC)", name: "TOTAL ORGANIC CARBON (TOC)" },
    { value: "TRANSFORMER", name: "TRANSFORMER" },
    { value: "TURBIDIMETER", name: "TURBIDIMETER" },
    { value: "ULTRA PURE WATER SYSTEM", name: "ULTRA PURE WATER SYSTEM" },
    { value: "ULTRASONIC LEVEL SENSOR", name: "ULTRASONIC LEVEL SENSOR" },
    { value: "ULTRASONIC PRESSURE TRANSMITTER", name: "ULTRASONIC PRESSURE TRANSMITTER" },
    { value: "ULTRAVIOLATE LAMPS", name: "ULTRAVIOLATE LAMPS" },
    { value: "UNINTERRUPTIBLE POWER SUPPLY", name: "UNINTERRUPTIBLE POWER SUPPLY" },
    { value: "VACUUM CIRCUIT BREAKER", name: "VACUUM CIRCUIT BREAKER" },
    { value: "VACUUM REGULATOR", name: "VACUUM REGULATOR" },
    { value: "VENTILATION FAN", name: "VENTILATION FAN" },
    { value: "VIBRATOR", name: "VIBRATOR" },
    { value: "VISCOMETER", name: "VISCOMETER" },
    { value: "WATER BALANCED AREA", name: "WATER BALANCED AREA" },
    { value: "WATERBATH", name: "WATERBATH" },
    { value: "WATERCRAFT-BOAT", name: "WATERCRAFT-BOAT" },
    { value: "WEIGHING SCALE", name: "WEIGHING SCALE" },
    { value: "WEIGHT CALIBRATION KIT", name: "WEIGHT CALIBRATION KIT" },
    { value: "NA", name: "NOT AVAILABLE" },
  ];
  assetowningdepartment = [
    { value: "CBS", name: "Customer Billing Sevices" },
    { value: "DB", name: "Distribution" },
    { value: "ESD", name: "Engineering Services-Distribution" },
    { value: "FLT", name: "Fleet" },
    { value: "LND", name: "Land" },
    { value: "NRW", name: "NRW" },
    { value: "PN", name: "Production Northern" },
    { value: "PS", name: "Production Southern" },
    { value: "SCD", name: "SCADA" },
    { value: "WQ", name: "Water Quality" },
    { value: "NA", name: "Not Available" },
  ];
  mainoperationregister = [
    { value: "CBS", name: "Customer Billing Services" },
    { value: "DB", name: "Distribution" },
    { value: "GA", name: "General Admin" },
    { value: "PRD", name: "Production" },
    { value: "SCD", name: "SCADA" },
    { value: "WQ", name: "Water Quality" },
    { value: "FLT", name: "Fleet" },
    { value: "NA", name: "Not Available" },
  ];
  region = [
    { value: "KS", name: "Kuala Selangor" },
    { value: "KUL", name: "Kuala Lumpur" },
    { value: "HL", name: "Hulu Langat" },
    { value: "SB", name: "Sabak Bernam" },
    { value: "PTG", name: "Petaling" },
    { value: "KLT", name: "Kuala Langat" },
    { value: "HS", name: "Hulu Selangor" },
    { value: "SP", name: "Sepang" },
    { value: "GBK", name: "Gombak" },
    { value: "KLG", name: "Klang" },
    { value: "NRTH", name: "North" },
    { value: "STH", name: "South" },
    { value: "HQ", name: "Headquarters" },
    { value: "NA", name: "Not Available" },
  ];
  operation = [
    { value: "ND", name: "NRW - District Metering Zone" },
    { value: "NT", name: "NRW - Transmission Network" },
    { value: "NW", name: "NRW - Water Balancing Area" },
    { value: "PH", name: "Pump House" },
    { value: "RS", name: "Reservoir" },
    { value: "VD", name: "Valve - Distribution Main" },
    { value: "VT", name: "Valve - Trunk Main" },
    { value: "WT", name: "Water Treatment Plant" },
    { value: "WL", name: "WQ Laboratory Services" },
    { value: "WO", name: "WQ - Online Analyzer" },
    { value: "WR", name: "WQ - River Monitoring Station" },
    { value: "WS", name: "WQ Sampling Station" },
    { value: "NA", name: "Not Available" },
  ];
  parentlocation = [
    { value: "AS", name: "Aeration System" },
    { value: "BR", name: "Balancing Reservoir" },
    { value: "BD", name: "Buildings" },
    { value: "CD", name: "Chemical Dosing" },
    { value: "CS", name: "Coagulation System" },
    { value: "DT", name: "Draw of Tower" },
    { value: "ES", name: "Earthing System" },
    { value: "EP", name: "Electrical Panel" },
    { value: "ES", name: "Electrical System" },
    { value: "FS", name: "Filtration Process" },
    { value: "FC", name: "Flocculation" },
    { value: "OR", name: "Off River Storage Reservoir" },
    { value: "RW", name: "Raw Water Process" },
    { value: "SP", name: "Sedimentation Process" },
    { value: "SS", name: "Solar System" },
    { value: "ST", name: "Sludge Treament Process" },
    { value: "SW", name: "Settled Water Process" },
    { value: "TI", name: "Tangki Imbang 3MG" },
    { value: "TO", name: "Tangki Imbangan 4MG (OLD)" },
    { value: "TN", name: "Tangki Imbangan 4MG (NEW)" },
    { value: "TS", name: "Telemetry System" },
    { value: "TP", name: "Treatment Process" },
    { value: "TW", name: "Treated Water Process" },
    { value: "WA", name: "Water Analysis" },
    { value: "NA", name: "Not Available" },
  ];
  // hierarchylevel1s = [
  //   { value: "CB", name: "Customer Billing Services" },
  //   { value: "DB", name: "Distribution" },
  //   { value: "FL", name: "Fleet" },
  //   { value: "GA", name: "General Admin" },
  //   { value: "PD", name: "Production" },
  //   { value: "SD", name: "SCADA" },
  //   { value: "WQ", name: "Water Quality" },
  //   { value: "NA", name: "Not Available" },
  // ];
  // hierarchylevel3s = [
  //   { value: "ND", name: "NRW - District Metering Zone" },
  //   { value: "NT", name: "NRW - Transmission Network" },
  //   { value: "NW", name: "NRW - Water Balancing Area" },
  //   { value: "PH", name: "Pump House" },
  //   { value: "RS", name: "Reservoir" },
  //   { value: "VD", name: "Valve - Distribution Main" },
  //   { value: "VT", name: "Valve - Trunk Main" },
  //   { value: "WT", name: "Water Treatment Plant" },
  //   { value: "WL", name: "WQ Laboratory Services" },
  //   { value: "WO", name: "WQ - Online Analyzer" },
  //   { value: "WR", name: "WQ - River Monitoring Station" },
  //   { value: "WS", name: "WQ Sampling Station" },
  //   { value: "NA", name: "Not Available" },
  // ];
  // hierarchylevel4s = [
  //   { value: "NR", name: "NRW" },
  //   { value: "PH", name: "Pump House" },
  //   { value: "RS", name: "Reservoir" },
  //   { value: "TP", name: "Treatment Plant Name" },
  //   { value: "NA", name: "Not Available" },
  // ];
  // hierarchylevel5s = [
  //   { value: "AS", name: "Aeration System" },
  //   { value: "BR", name: "Balancing Reservoir" },
  //   { value: "BD", name: "Buildings" },
  //   { value: "CD", name: "Chemical Dosing" },
  //   { value: "CS", name: "Coagulation System" },
  //   { value: "DT", name: "Draw of Tower" },
  //   { value: "ES", name: "Earthing System" },
  //   { value: "EP", name: "Electrical Panel" },
  //   { value: "ES", name: "Electrical System" },
  //   { value: "FS", name: "Filtration Process" },
  //   { value: "FC", name: "Flocculation" },
  //   { value: "OR", name: "Off River Storage Reservoir" },
  //   { value: "RW", name: "Raw Water Process" },
  //   { value: "SP", name: "Sedimentation Process" },
  //   { value: "SS", name: "Solar System" },
  //   { value: "ST", name: "Sludge Treament Process" },
  //   { value: "SW", name: "Settled Water Process" },
  //   { value: "TI", name: "Tangki Imbang 3MG" },
  //   { value: "TO", name: "Tangki Imbangan 4MG (OLD)" },
  //   { value: "TN", name: "Tangki Imbangan 4MG (NEW)" },
  //   { value: "TS", name: "Telemetry System" },
  //   { value: "TP", name: "Treatment Process" },
  //   { value: "TW", name: "Treated Water Process" },
  //   { value: "WA", name: "Water Analysis" },
  //   { value: "NA", name: "Not Available" },
  // ];
  // hierarchylevel6s = [
  //   { value: "AP", name: "Actiflo Process" },
  //   { value: "AC", name: "Activated Carbon Process" },
  //   { value: "AS", name: "Aeration System" },
  //   { value: "ES", name: "Alum Process" },
  //   { value: "BP", name: "Backwash Process" },
  //   { value: "BR", name: "Balancing Reservoir" },
  //   { value: "BO", name: "Boat House" },
  //   { value: "BU", name: "Buildings" },
  //   { value: "CD", name: "Chemical Dosing" },
  //   { value: "CM", name: "Chemical Process" },
  //   { value: "CP", name: "Chlorination Process" },
  //   { value: "CO", name: "Coagulation Process" },
  //   { value: "CR", name: "Chemical Room" },
  //   { value: "CC", name: "Control Centre" },
  //   { value: "CR", name: "Control Room" },
  //   { value: "DP", name: "Data Process" },
  //   { value: "DS", name: "Distrafication" },
  //   { value: "DO", name: "Draw Off Process" },
  //   { value: "ES", name: "Earthing System" },
  //   { value: "EL", name: "Electrical System" },
  //   { value: "FS", name: "Facilities System" },
  //   { value: "FP", name: "Filtration Process" },
  //   { value: "FW", name: "Filtered Water Sampling" },
  //   { value: "FO", name: "Flocculation Process" },
  //   { value: "FL", name: "Fluoride Process" },
  //   { value: "LB", name: "Laboratory" },
  //   { value: "LP", name: "Lime Process" },
  //   { value: "OA", name: "Online Analyzer" },
  //   { value: "PR", name: "Polymer (Residual) Dosing" },
  //   { value: "PA", name: "Poly Aluminium Chloride Process" },
  //   { value: "PP", name: "Polymer Process" },
  //   { value: "PS", name: "Power Supply" },
  //   { value: "RM", name: "Rapid Mixing" },
  //   { value: "RE", name: "Residual Emergency Lagoon" },
  //   { value: "RT", name: "Residual Thickened Pumping Station" },
  //   { value: "RI", name: "Raw Water Intake System" },
  //   { value: "RS", name: "Raw Water Pumping System" },
  //   { value: "RP", name: "Raw Water Process" },
  //   { value: "RE", name: "Raw Water Pipeline" },
  //   { value: "RV", name: "Reservoir" },
  //   { value: "SS", name: "SCADA System" },
  //   { value: "SD", name: "Sedimentation Process" },
  //   { value: "SL", name: "Settled Water Process" },
  //   { value: "SS", name: "Settled Water Sampling" },
  //   { value: "SW", name: "Settled Water Pumping System" },
  //   { value: "SB", name: "Sludge Balancing" },
  //   { value: "ST", name: "Sludge Treament Process" },
  //   { value: "SQ", name: "Solid Liquid Separation" },
  //   { value: "SA", name: "Solar System" },
  //   { value: "SI", name: "Sodium Alumino Silicate Process" },
  //   { value: "SO", name: "Soda Ash Process" },
  //   { value: "TA", name: "Tangki Sedit SYABAS" },
  //   { value: "TE", name: "Telemetry System" },
  //   { value: "TP", name: "Treated Water Process" },
  //   { value: "TS", name: "Treated Water Sampling" },
  //   { value: "TL", name: "Treated Water Pipeline" },
  //   { value: "TW", name: "Treated Water Pumping System" },
  //   { value: "TT", name: "Treatment Process" },
  //   { value: "WA", name: "Water Analysis" },
  //   { value: "WO", name: "Workshop" },
  //   { value: "WT", name: "Water Transfer" },
  //   { value: "WP", name: "Wash Water Process" },
  //   { value: "WR", name: "Wash Water Recovery" },
  //   { value: "WS", name: "Wash Water System" },
  //   { value: "NA", name: "Not Available" },
  // ];
  typeassets = [];
  categories = [];
  identities = [];
  assetprimary = [];
  assetprimaryshow = [];
  assetprimaryselector = [];

  assetprimaryselectorshow =
  [
    {
      // asset_type_id: "",
      brand: true,
      capacity_size: true,
      closing_torque: true,
      hysteresis: true,
      installation: true,
      manufacturer: true,
      manufacture_part_number: true,
      manufacturer_year: true,
      model: true,
      opening_torque: true,
      power_supply_type: true,
      revolutions_per_minute: true,
      type: true,
      material_type: true,
      valve_pressure_rating: true,
      horse_power: true,
      temperature: true,
      coverage_range: true,
      voltage: true,
      valve_diameter: true,
      top_water_level: true,
      inlet_diameter: true,
      bottom_water_level: true,
      outlet_diameter: true,
      staging_height: true,
      dimention: true,
      environmental_performance: true,
      no_of_channel: true,
      frequency: true,
      vehicle_chassis_number: true,
      vehicle_engine_capacity: true,
      vehicle_engine_number: true,
      vehicle_insurance_cover_note_number: true,
      vehicle_insurance_date_period_from: true,
      vehicle_insurance_no_claim_discount: true,
      vehicle_insurance_total_premium: true,
      vehicle_insurance_policy_type: true,
      vehicle_insurance_sum_insured: true,
      vehicle_insurance_date_period_to: true,
      vehicle_insurance_auto_windscreen_insured: true,
      vehicle_model: true,
      vehicle_owner_status: true,
      vehicle_puspakom_expired_date: true,
      vehicle_puspakom_date_inspection: true,
      vehicle_register_date: true,
      vehicle_registration_owner: true,
      vehicle_roadtax_rate: true,
      vehicle_roadtax_renew_date: true,
      vehicle_insurance_vendor: true,
      vehicle_seating_capacity: true,
      vehicle_spad_permit_date_period_from: true,
      vehicle_spad_no_license_operator: true,
      vehicle_spad_permit_date_period_to: true,
      motor_current: true,
      insulation: true,
      no_of_phases: true,
      communication_protocol: true,
      flow_rate: true,
      pump_head: true,
      no_of_stage: true,
      infrastructure_status_reason: true,
      infrastructure_status: true,
      legal_name: true,
      source_from: true,
      supply_location: true,
    }
  ];

  assetprimaryselectorshowdefault =
  [
    {
      // asset_type_id: "",
      brand: true,
      capacity_size: true,
      closing_torque: true,
      hysteresis: true,
      installation: true,
      manufacturer: true,
      manufacture_part_number: true,
      manufacturer_year: true,
      model: true,
      opening_torque: true,
      power_supply_type: true,
      revolutions_per_minute: true,
      type: true,
      material_type: true,
      valve_pressure_rating: true,
      horse_power: true,
      temperature: true,
      coverage_range: true,
      voltage: true,
      valve_diameter: true,
      top_water_level: true,
      inlet_diameter: true,
      bottom_water_level: true,
      outlet_diameter: true,
      staging_height: true,
      dimention: true,
      environmental_performance: true,
      no_of_channel: true,
      frequency: true,
      vehicle_chassis_number: true,
      vehicle_engine_capacity: true,
      vehicle_engine_number: true,
      vehicle_insurance_cover_note_number: true,
      vehicle_insurance_date_period_from: true,
      vehicle_insurance_no_claim_discount: true,
      vehicle_insurance_total_premium: true,
      vehicle_insurance_policy_type: true,
      vehicle_insurance_sum_insured: true,
      vehicle_insurance_date_period_to: true,
      vehicle_insurance_auto_windscreen_insured: true,
      vehicle_model: true,
      vehicle_owner_status: true,
      vehicle_puspakom_expired_date: true,
      vehicle_puspakom_date_inspection: true,
      vehicle_register_date: true,
      vehicle_registration_owner: true,
      vehicle_roadtax_rate: true,
      vehicle_roadtax_renew_date: true,
      vehicle_insurance_vendor: true,
      vehicle_seating_capacity: true,
      vehicle_spad_permit_date_period_from: true,
      vehicle_spad_no_license_operator: true,
      vehicle_spad_permit_date_period_to: true,
      motor_current: true,
      insulation: true,
      no_of_phases: true,
      communication_protocol: true,
      flow_rate: true,
      pump_head: true,
      no_of_stage: true,
      infrastructure_status_reason: true,
      infrastructure_status: true,
      legal_name: true,
      source_from: true,
      supply_location: true,
    }
  ];

  primarycategories = [];
  groupsubcategory1s = [];
  groupsubcategory2s = [];
  ratings = [
    { value: "1", name: "1 - Very Good" },
    { value: "2", name: "2 - Good" },
    { value: "3", name: "3 - Average" },
    { value: "4", name: "4 - Popover" },
    { value: "5", name: "5 - Replace" },
  ];
  statuses = [{ value: "NA", name: "Not Available" }];
  measuringtypes = [
    { value: "FM", name: "Flow Meter Readings" },
    { value: "TP", name: "Temperature" },
    { value: "OT", name: "Other" },
  ];

  is_show1 = {
    parent_location: true, //
    location_description: true, //
    building: true, //
    address_line_1: true,  //
    address_line_2: true, //
    address_line_3: true, //
    city: true, //
    state: true, //
    postal_code: true, //
    country: true, //
    tag_number: true, //
    service_area: true, //
    maintenance_planner: true, //
    location_main_contact: true, //
    location_asset_maintenance_manager: true, //
    gis_esri_id: true, //
    latitude: true, //
    longitude: true, //
    asset_critically: true, //
    cost_center: true,
    // asset_owning_depart: true,
    sub_process_system: true,
    brand: true,
    size_capacity_1: true,
    size_capacity_2: true,
    size_capacity_3: true,
    maintenance_specification: true,
    asset_owning_department: true,
    asset_or_component_type: true,
    badge_no: true,
    size_capacity_1_unit_measurement: true,
    size_capacity_2_unit_measurement: true,
    size_capacity_3_unit_measurement: true,
    measurement_type: true,
    main_operation: true,
    asset_class_asset_category: true,
    internal_asset_identity: true,
    sub_category_1: true,
    parent_asset_plate_number: true,
    purchase_date_installed_handed_over_date: true,
    warranty: true,
    region: true,
    handed_over_asset_or_procured: true,
    asset_primary_category: true,
    sub_category_2: true,
    asset_plate_number: true,
    condition_rating: true,
    actual_warranty_period: true,
    operation: true,
    process_function: true,
    model_number: true,
    detailed_description: true,
    serial_number: true,
    asset_status: true,
    warranty_vendor_name: true,
    asset_tag_number: true,
    asset_identity: true,
    bottom_water_level: true,
    closing_torque: true,
    dimention: true,
    frequency: true,
    infrastructure_status: true,
    installation: true,
    manufacturer: true,
    material_type: true,
    no_of_channel: true,
    opening_torque: true,
    pump_head: true,
    staging_height: true,
    top_water_level: true,
    valve_pressure_rating: true,
    vehicle_engine_number: true,
    vehicle_insurance_auto_windscreen_insured: true,
    vehicle_insurance_sum_insured: true,
    vehicle_owner_status: true,
    vehicle_puspakom_expired_date: true,
    vehicle_roadtax_expired_date: true,
    vehicle_seating_capacity: true,
    communication_protocol: true,
    environmental_performance: true,
    horse_power: true,
    infrastructure_status_reason: true,
    insulation: true,
    manufacturer_year: true,
    model: true,
    no_of_phases: true,
    outlet_diameter: true,
    revolutions_per_minute: true,
    supply_location: true,
    type: true,
    vehicle_chasis_number: true,
    vehicle_insurance_vendor: true,
    vehicle_insurance_cover_note_number: true,
    vehicle_insurance_no_claim_discount: true,
    vehicle_insurance_total_premium: true,
    vehicle_register_date: true,
    vehicle_spad_permit_date_period_to: true,
    vehicle_spad_no_license_operator: true,
    vehicle_registration_owner: true,
    capacity_size: true,
    coverage_range: true,
    flow_rate: true,
    hysteresis: true,
    inlet_diameter: true,
    legal_name: true,
    manufacture_part_number: true,
    motor_current: true,
    no_of_stage: true,
    power_supply_type: true,
    source_from: true,
    temperature: true,
    valve_diameter: true,
    vehicle_engine_capacity: true,
    vehicle_model: true,
    vehicle_insurance_date_period_from: true,
    vehicle_insurance_policy_type: true,
    vehicle_puspakom_date_inspection: true,
    vehicle_roadtax_rate: true,
    vehicle_roadtax_renew_date: true,
    vehicle_spad_permit_date_period_from: true,
    voltage: true,
    vehicle_insurance_date_period_to: true
  }

  tableShow1 = false

  // Datatable
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  SelectionType = SelectionType;

  // entries: number = 2;
  // selected: any[] = [];
  // temp = [];
  // activeRow: any;
  rows: any = [];
  // SelectionType = SelectionType;
  tableTemp1 = [];

  // Forms
  fileuploadFormGroup: FormGroup;
  assetAttributeGroup: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  // thirdFormGroup: FormGroup;
  // fourthFormGroup: FormGroup;
  // fifthFormGroup: FormGroup;
  // sixthFormGroup: FormGroup;
  // seventhFormGroup: FormGroup;
  validation_messages = [];
  rowData: any

  // Asset Attribute Visibility
  assetattributecolumnapi = [];
  assetprimarycolumnselector = [];
  assetattributevisible = [
    {
      "asset_primary_category": "ACTUATOR",
      "brand": "true",
      "capacity_size": "true",
      "closing_torque": "true",
      "hysteresis": "true",
      "installation": "true",
      "manufacturer": "true",
      "manufacture_part_number": "true",
      "manufacturer_year": "true",
      "model": "true",
      "opening_torque": "true",
      "power_supply_type": "true",
      "revolutions_per_minute": "true",
      "type": "false",
      "material_type": "false",
      "valve_pressure_rating": "false",
      "horse_power": "false",
      "temperature": "false",
      "coverage_range": "false",
      "voltage": "false",
      "valve_diameter": "false",
      "top_water_level": "false",
      "inlet_diameter": "false",
      "bottom_water_level": "false",
      "outlet_diameter": "false",
      "staging_height": "false",
      "dimention": "false",
      "environmental_performance": "false",
      "no_of_channel": "false",
      "frequency": "false",
      "vehicle_chassis_number": "false",
      "vehicle_engine_capacity": "false",
      "vehicle_engine_number": "false",
      "vehicle_insurance_cover_note_number": "false",
      "vehicle_insurance_date_period_from": "false",
      "vehicle_insurance_no_claim_discount": "false",
      "vehicle_insurance_total_premium": "false",
      "vehicle_insurance_policy_type": "false",
      "vehicle_insurance_sum_insured": "false",
      "vehicle_insurance_date_period_to": "false",
      "vehicle_insurance_auto_windscreen_insured": "false",
      "vehicle_model": "false",
      "vehicle_owner_status": "false",
      "vehicle_puspakom_expired_date": "false",
      "vehicle_puspakom_date_inspection": "false",
      "vehicle_register_date": "false",
      "vehicle_registration_owner": "false",
      "vehicle_roadtax_rate": "false",
      "vehicle_roadtax_renew_date": "false",
      "vehicle_insurance_vendor": "false",
      "vehicle_seating_capacity": "false",
      "vehicle_spad_permit_date_period_from": "false",
      "vehicle_spad_no_license_operator": "false",
      "vehicle_spad_permit_date_period_to": "false",
      "motor_current": "false",
      "insulation": "false",
      "no_of_phases": "false",
      "communication_protocol": "false",
      "flow_rate": "false",
      "pump_head": "false",
      "no_of_stage": "false",
      "infrastructure_status_reason": "false",
      "infrastructure_status": "false",
      "legal_name": "false",
      "source_from": "false",
      "supply_location": "false",
    },
    {
      "asset_primary_category": "AIR VALVE",
      "brand": "true",
      "capacity_size": "true",
      "closing_torque": "false",
      "hysteresis": "false",
      "installation": "true",
      "manufacturer": "true",
      "manufacture_part_number": "true",
      "manufacturer_year": "true",
      "model": "true",
      "opening_torque": "false",
      "power_supply_type": "false",
      "revolutions_per_minute": "false",
      "type": "true",
      "material_type": "true",
      "valve_pressure_rating": "true",
      "horse_power": "false",
      "temperature": "false",
      "coverage_range": "false",
      "voltage": "false",
      "valve_diameter": "true",
      "top_water_level": "false",
      "inlet_diameter": "false",
      "bottom_water_level": "false",
      "outlet_diameter": "false",
      "staging_height": "false",
      "dimention": "false",
      "environmental_performance": "false",
      "no_of_channel": "false",
      "frequency": "false",
      "vehicle_chassis_number": "false",
      "vehicle_engine_capacity": "false",
      "vehicle_engine_number": "false",
      "vehicle_insurance_cover_note_number": "false",
      "vehicle_insurance_date_period_from": "false",
      "vehicle_insurance_no_claim_discount": "false",
      "vehicle_insurance_total_premium": "false",
      "vehicle_insurance_policy_type": "false",
      "vehicle_insurance_sum_insured": "false",
      "vehicle_insurance_date_period_to": "false",
      "vehicle_insurance_auto_windscreen_insured": "false",
      "vehicle_model": "false",
      "vehicle_owner_status": "false",
      "vehicle_puspakom_expired_date": "false",
      "vehicle_puspakom_date_inspection": "false",
      "vehicle_register_date": "false",
      "vehicle_registration_owner": "false",
      "vehicle_roadtax_rate": "false",
      "vehicle_roadtax_renew_date": "false",
      "vehicle_insurance_vendor": "false",
      "vehicle_seating_capacity": "false",
      "vehicle_spad_permit_date_period_from": "false",
      "vehicle_spad_no_license_operator": "false",
      "vehicle_spad_permit_date_period_to": "false",
      "motor_current": "false",
      "insulation": "false",
      "no_of_phases": "false",
      "communication_protocol": "false",
      "flow_rate": "false",
      "pump_head": "false",
      "no_of_stage": "false",
      "infrastructure_status_reason": "false",
      "infrastructure_status": "false",
      "legal_name": "false",
      "source_from": "false",
      "supply_location": "false",
    },
    {
      "asset_primary_category": "AIR VALVE",
      "brand": "true",
      "capacity_size": "true",
      "closing_torque": "false",
      "hysteresis": "false",
      "installation": "true",
      "manufacturer": "true",
      "manufacture_part_number": "true",
      "manufacturer_year": "true",
      "model": "true",
      "opening_torque": "false",
      "power_supply_type": "false",
      "revolutions_per_minute": "true",
      "type": "false",
      "material_type": "false",
      "valve_pressure_rating": "false",
      "horse_power": "true",
      "temperature": "true",
      "coverage_range": "false",
      "voltage": "true",
      "valve_diameter": "false",
      "top_water_level": "false",
      "inlet_diameter": "false",
      "bottom_water_level": "false",
      "outlet_diameter": "false",
      "staging_height": "false",
      "dimention": "false",
      "environmental_performance": "false",
      "no_of_channel": "false",
      "frequency": "true",
      "vehicle_chassis_number": "false",
      "vehicle_engine_capacity": "false",
      "vehicle_engine_number": "false",
      "vehicle_insurance_cover_note_number": "false",
      "vehicle_insurance_date_period_from": "false",
      "vehicle_insurance_no_claim_discount": "false",
      "vehicle_insurance_total_premium": "false",
      "vehicle_insurance_policy_type": "false",
      "vehicle_insurance_sum_insured": "false",
      "vehicle_insurance_date_period_to": "false",
      "vehicle_insurance_auto_windscreen_insured": "false",
      "vehicle_model": "false",
      "vehicle_owner_status": "false",
      "vehicle_puspakom_expired_date": "false",
      "vehicle_puspakom_date_inspection": "false",
      "vehicle_register_date": "false",
      "vehicle_registration_owner": "false",
      "vehicle_roadtax_rate": "false",
      "vehicle_roadtax_renew_date": "false",
      "vehicle_insurance_vendor": "false",
      "vehicle_seating_capacity": "false",
      "vehicle_spad_permit_date_period_from": "false",
      "vehicle_spad_no_license_operator": "false",
      "vehicle_spad_permit_date_period_to": "false",
      "motor_current": "true",
      "insulation": "true",
      "no_of_phases": "true",
      "communication_protocol": "false",
      "flow_rate": "false",
      "pump_head": "false",
      "no_of_stage": "false",
      "infrastructure_status_reason": "false",
      "infrastructure_status": "false",
      "legal_name": "false",
      "source_from": "false",
      "supply_location": "false",
    }
  ];

  constructor(
    public formBuilder: FormBuilder,
    public modalService: BsModalService,
    public assetsService: AssetsService,
    public assetGroupsService: AssetGroupsService,
    public assetTypesService: AssetTypesService,
    public authService: AuthService,
    public organisationsService: OrganisationsService,
    public regionsService: RegionsService,
    public toastr: NotifyService,
    public assetsRegistrationService: AssetsRegistrationService,
    public assetsLocationService: AssetsLocationService,
    public assetsAttributeService: AssetsAttributeService,
    public assetsAttributeColumnService: AssetAttributeColumnService,
    private spinner: NgxSpinnerService
  ) {
    this.getAssets();
    this.getRegisteredData()

    this.firstFormGroup = this.formBuilder.group({
      asset_primary_category: ["", Validators.required],
      asset_identity: ["", Validators.required],
      sub_category_1: ["", Validators.required],
      sub_category_2: ["", Validators.required],
      asset_or_component_type: ["", Validators.required],
      handed_over_asset_or_procured: ["", Validators.required],
      class_category: ["", Validators.required],
      asset_owning_department: ["", Validators.required],
      main_operation: ["", Validators.required],
      region: ["", Validators.required],
      operation: ["", Validators.required],
      parent_location: ["", Validators.required],
      process_function: ["", Validators.required],
      sub_process_system: ["", Validators.required],
      location_description: ["", Validators.required],
      building: ["", Validators.required],
      address_line_1: ["", Validators.required],
      address_line_2: ["", Validators.required],
      address_line_3: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required],
      postal_code: ["", Validators.required],
      country: ["", Validators.required],
      tag_number: ["", Validators.required],
      service_area: ["", Validators.required],
      location_main_contact: ["", Validators.required],
      location_asset_maintenance_manager: ["", Validators.required],
      maintenance_planner: ["", Validators.required],
      gis_esri_id: ["", Validators.required],
      latitude: ["", Validators.required],
      longitude: ["", Validators.required],
      asset_critically: ["", Validators.required],
      cost_center: ["", Validators.required],
      brand: ["", Validators.required],
      model_number: ["", Validators.required],
      size_capacity_1: ["", Validators.required],
      size_capacity_2: ["", Validators.required],
      size_capacity_3: ["", Validators.required],
      size_capacity_1_unit_measurement: ["", Validators.required],
      size_capacity_2_unit_measurement: ["", Validators.required],
      size_capacity_3_unit_measurement: ["", Validators.required],
      parent_asset_plate_number: ["", Validators.required],
      asset_plate_number: ["", Validators.required],
      detailed_description: ["", Validators.required],
      serial_number: ["", Validators.required],
      asset_tag_number: ["", Validators.required],
      purchase_date_installed_handed_over_date: ["", Validators.required],
      condition_rating: ["", Validators.required],
      status: ["", Validators.required],
      maintenance_specification: ["", Validators.required],
      measurement_type: ["", Validators.required],
      warranty: ["", Validators.required],
      actual_warranty_period: ["", Validators.required],
      warranty_vendor_name: ["", Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      bottom_water_level: ["", Validators.required],
      brand: ["", Validators.required],
      capacity_size: ["", Validators.required],
      closing_torque: ["", Validators.required],
      communication_protocol: ["", Validators.required],
      coverage_range: ["", Validators.required],
      dimention: ["", Validators.required],
      environmental_performance: ["", Validators.required],
      flow_rate: ["", Validators.required],
      frequency: ["", Validators.required],
      horse_power: ["", Validators.required],
      hysteresis: ["", Validators.required],
      infrastructure_status: ["", Validators.required],
      infrastructure_status_reason: ["", Validators.required],
      inlet_diameter: ["", Validators.required],
      installation: ["", Validators.required],
      insulation: ["", Validators.required],
      legal_name: ["", Validators.required],
      manufacturer: ["", Validators.required],
      manufacturer_year: ["", Validators.required],
      manufacture_part_number: ["", Validators.required],
      material_type: ["", Validators.required],
      model: ["", Validators.required],
      motor_current: ["", Validators.required],
      no_of_channel: ["", Validators.required],
      no_of_phases: ["", Validators.required],
      no_of_stage: ["", Validators.required],
      opening_torque: ["", Validators.required],
      outlet_diameter: ["", Validators.required],
      power_supply_type: ["", Validators.required],
      pump_head: ["", Validators.required],
      revolutions_per_minute: ["", Validators.required],
      source_from: ["", Validators.required],
      staging_height: ["", Validators.required],
      supply_location: ["", Validators.required],
      temperature: ["", Validators.required],
      top_water_level: ["", Validators.required],
      type: ["", Validators.required],
      valve_diameter: ["", Validators.required],
      valve_pressure_rating: ["", Validators.required],
      vehicle_chassis_number: ["", Validators.required],
      vehicle_engine_capacity: ["", Validators.required],
      vehicle_engine_number: ["", Validators.required],
      vehicle_insurance_vendor: ["", Validators.required],
      vehicle_model: ["", Validators.required],
      vehicle_insurance_auto_windscreen_insured: ["", Validators.required],
      vehicle_insurance_cover_note_number: ["", Validators.required],
      vehicle_insurance_date_period_from: ["", Validators.required],
      vehicle_insurance_date_period_to: ["", Validators.required],
      vehicle_insurance_no_claim_discount: ["", Validators.required],
      vehicle_insurance_policy_type: ["", Validators.required],
      vehicle_insurance_sum_insured: ["", Validators.required],
      vehicle_insurance_total_premium: ["", Validators.required],
      vehicle_puspakom_date_inspection: ["", Validators.required],
      vehicle_owner_status: ["", Validators.required],
      vehicle_register_date: ["", Validators.required],
      vehicle_roadtax_rate: ["", Validators.required],
      vehicle_puspakom_expired_date: ["", Validators.required],
      vehicle_spad_permit_date_period_to: ["", Validators.required],
      vehicle_roadtax_renew_date: ["", Validators.required],
      vehicle_roadtax_expired_date: ["", Validators.required],
      vehicle_spad_no_license_operator: ["", Validators.required],
      vehicle_spad_permit_date_period_from: ["", Validators.required],
      vehicle_seating_capacity: ["", Validators.required],
      vehicle_registration_owner: ["", Validators.required],
      voltage: ["", Validators.required],
    });
    this.fileuploadFormGroup = this.formBuilder.group({
      excelFile: ["", Validators.required],
    });
    this.assetAttributeGroup = this.formBuilder.group({
      asset_identity: [""],
    })
  }

  getAssets() {
    // this.rows = assets;
    // this.temp = this.rows.map((prop, key) => {
    //   return {
    //     ...prop,
    //     // id: key,
    //     no: key,
    //   };
    // });

    this.assetsService.get().subscribe((assets) => {
      if (assets) {
        this.rows = assets;
        this.temp = this.rows.map((prop, key) => {
          return {
            ...prop,
            // id: key,
            no: key,
          };
        });
      }
    });
  }

  ngOnInit() {
    this.regionsService.get().subscribe(
      (res) => {
        if (res) this.regions = res;
      },
      (err) => {
        console.error("err", err);
      },
      () => {
        console.log("Http request completed");
      }
    );

    // this.organisationsService.get().subscribe(
    //   (res) => {
    //     if (res) this.organisations = res;
    //   },
    //   (err) => {
    //     console.error("err", err);
    //   },
    //   () => {
    //     console.log("Http request completed");
    //   }
    // );

    this.assetTypesService.get().subscribe(
      (res) => {
        if (res) {
          this.primarycategories = res.filter(function (data) {
            if (data.category.toString().toLowerCase().indexOf("at") !== -1)
              return true;
            return false;
          });

          this.typeassets = res.filter(function (data) {
            if (data.category.toString().toLowerCase().indexOf("ac") !== -1)
              return true;
            return false;
          });

          this.categories = res.filter(function (data) {
            if (data.category.toString().toLowerCase().indexOf("ag") !== -1)
              return true;
            return false;
          });
        }
      },
      (err) => {
        console.error("err", err);
      },
      () => {
        console.log("Http request completed");
      }
    );

    this.assetGroupsService.get().subscribe(
      (res) => {
        if (res) {
          this.identities = res.filter(function (data) {
            if (data.category.toString().toLowerCase().indexOf("ai") !== -1)
              return true;
            return false;
          });

          this.groupsubcategory1s = res.filter(function (data) {
            if (data.category.toString().toLowerCase().indexOf("s1") !== -1)
              return true;
            return false;
          });

          this.groupsubcategory2s = res.filter(function (data) {
            if (data.category.toString().toLowerCase().indexOf("s2") !== -1)
              return true;
            return false;
          });
        }
      },
      (err) => {
        console.error("err", err);
      },
      () => {
        console.log("Http request completed");
      }
    );

    // let currentSingleFile = undefined;
    // // single dropzone file - accepts only images
    // new Dropzone(document.getElementsByClassName("dropzone-single")[0], {
    //   url: "/",
    //   thumbnailWidth: null,
    //   thumbnailHeight: null,
    //   previewsContainer: document.getElementsByClassName(
    //     "dz-preview-single"
    //   )[0],
    //   previewTemplate: document.getElementsByClassName("dz-preview-single")[0]
    //     .innerHTML,
    //   maxFiles: 1,
    //   acceptedFiles: "image/*",
    //   init: function () {
    //     this.on("addedfile", function (file) {
    //       if (currentSingleFile) {
    //         this.removeFile(currentSingleFile);
    //       }
    //       currentSingleFile = file;
    //     });
    //   },
    // });
    // document.getElementsByClassName("dz-preview-single")[0].innerHTML = "";
  }

  entriesChange($event) {
    console.log($event)
    this.entries = $event.target.value;
    console.log(this.entries)
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    this.activeRow = event.row;
  }

  openModal(modalNotification: TemplateRef<any>) {
    console.log("openModal");
    this.modal = this.modalService.show(modalNotification, this.modalConfig);
  }

  openModalUpload(modalNotification: TemplateRef<any>) {
    this.modal = this.modalService.show(modalNotification, this.modalConfigUpload);
  }

  openModalViewAsset(modalNotification: TemplateRef<any>) {
    this.modalViewAsset = this.modalService.show(
      modalNotification,
      this.modalViewAssetConfig
    );
  }

  openModalRegister(modalNotification: TemplateRef<any>) {

    this.modalRegisterAsset = this.modalService.show(
      modalNotification,
      this.modalConfig,
      // this.firstFormGroup.patchValue({
      //   ...row,
      // }),
      // this.secondFormGroup.patchValue({
      //   ...row,
      // }),
    );
  }

  openModalAssetAttribute(modalNotification: TemplateRef<any>, row) {

    let tempData = [];
    this.assetsAttributeColumnService.get().subscribe(
      (res) => {
        res.forEach(function(assetprimer){
          // console.log("asset primary uina =",assetprimer);
          tempData.push(assetprimer)
        })
        this.assetattributecolumnapi = tempData
        let assetprimary1 = row.asset_primary_category
        let assetprimary2 = this.assetattributecolumnapi.map(a => a.asset_type_id);
        // let result = this.map(({ foo }) => foo)


        this.rowData = ''
        this.rowData = row


        if (assetprimary2.indexOf(assetprimary1) !== -1) {
          console.log("there is match");
          this.assetprimary = this.assetattributecolumnapi.filter(function (primary) {
            return primary.asset_type_id == assetprimary1;
          })

        this.assetprimaryshow = Object.values(this.assetprimary)
        console.log("assetprimary = ", this.assetprimaryshow)


        }
        else {
          console.log("there is no match");
        }
        this.ModalAssetAttribute = this.modalService.show(
          modalNotification,
          this.modalConfig,

        );
        },
        error => {
            console.error("err", error);
          }
        )
        // this.assetAttribute.forEach(function (lll, mm) {

    // this.assetsRegistrationService.getNewRegList().subscribe(
    //   (res) => {
    //     console.log("res all data", res);
    //     res.forEach(function (val) {
    //       val['isTick'] = false
    //       tempData.push(val)
    //     })
    //     console.log('tempData = ', tempData)
    //     this.tableTemp1 = tempData


  }

  openModalEdit(modalNotification: TemplateRef<any>, row) {
    this.firstFormGroup.patchValue({
      ...row,
    });
    this.secondFormGroup.patchValue({
      ...row,
    });
    // this.thirdFormGroup.patchValue({
    //   ...row,
    // });
    // this.fourthFormGroup.patchValue({
    //   ...row,
    // });
    // this.fifthFormGroup.patchValue({
    //   ...row,
    // });
    // this.sixthFormGroup.patchValue({
    //   ...row,
    // });
    // this.seventhFormGroup.patchValue({
    //   ...row,
    // });

    this.modalEditAsset = this.modalService.show(
      modalNotification,
      this.modalConfig
    );
  }

  register() {
    let postAssets = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      // ...this.thirdFormGroup.value,
      // ...this.fourthFormGroup.value,
      // ...this.fifthFormGroup.value,
      // ...this.sixthFormGroup.value,
      // ...this.seventhFormGroup.value,
      created_by: this.authService.userID
    };

    this.assetsRegistrationService.post(postAssets).subscribe(
      (res) => {
        if (res) {
          console.log("res", res);
          this.toastr.openToastr(
            "Your asset have successfully registered.",
            "Register Asset"
          );
          // console.log('Berjaya')
          this.modalRegisterAsset.hide();
          this.getAssets();
        }
      },
      (err) => {
        console.log('err=', err)
        //Failed
        console.error("err", err);
        this.validation_messages = err.error;
      },
      () => {
        console.log("Http request completed");
      }
    );
  }

  update() {
    let editAssets = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      // ...this.thirdFormGroup.value,
      // ...this.fourthFormGroup.value,
      // ...this.fifthFormGroup.value,
      // ...this.sixthFormGroup.value,
      // ...this.seventhFormGroup.value,
      created_by: this.authService.userID
    };

    this.assetsService.update(this.firstFormGroup.value.id, editAssets).subscribe(
      (res) => {
        if (res) {
          console.log("res", res);
          this.toastr.openToastr(
            "Your asset have successfully updated.",
            "Register Asset"
          );
          this.modalEditAsset.hide();
          this.getAssets();
        }
      },
      (err) => {
        console.error("err", err);
        this.validation_messages = err.error;
      },
      () => {
        console.log("Http request completed");
      }
    );
  }

  openSearch() {
    document.body.classList.add("g-navbar-search-showing");
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-showing");
      document.body.classList.add("g-navbar-search-show");
    }, 150);
    setTimeout(function () {
      document.body.classList.add("g-navbar-search-shown");
    }, 300);
  }

  closeSearch() {
    document.body.classList.remove("g-navbar-search-shown");
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-show");
      document.body.classList.add("g-navbar-search-hiding");
    }, 150);
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-hiding");
      document.body.classList.add("g-navbar-search-hidden");
    }, 300);
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-hidden");
    }, 500);
  }

  onSubmit() {
    swal.fire({
      title: "Success",
      text: "Your data successfully inserted into the system",
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success",
    });
  }

  getCategory(value: string) {
    let result = this.categories.find((obj) => {
      return obj.id === value;
    });
    return result.name;
  }

  getAssetType(value: string) {
    let result = this.typeassets.find((obj) => {
      return obj.id === value;
    });
    return result.name;
  }

  tabChecker(path: string) {
    if (path == 'account') {
      this.firstTab = true;
      this.secondTab = false;
      this.thirdTab = false;
    }
    else if (path == 'transaction') {
      this.firstTab = false;
      this.secondTab = true;
      this.thirdTab = false;
    }
    else if (path == 'order') {
      this.firstTab = false;
      this.secondTab = false;
      this.thirdTab = true;
    }
    else {
      this.firstTab = true;
      this.secondTab = false;
      this.thirdTab = false;
    }
  }

  showTable() {
    let counter = 0
    for (let x in this.is_show1) {
      if (this.is_show1[x]) {
        counter++
      }
    }
    console.log('counter = ', counter)
    if (counter > 2) {
      this.tableShow1 = true
    }
    else {
      // console.log('bluek')
    }
  }

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      // console.log('wb = ', wb);
      const wsname: string = wb.SheetNames[1];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      // console.log('ws = ', ws);
      this.dataFromExcelFile = (XLSX.utils.sheet_to_json(ws, { raw: false }));
      // console.log('this.data = ', this.dataFromExcelFile);
      // let x = this.data.slice(1);
      // console.log('x = ', x);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  closeModal() {
    this.modal.hide();
  }

  submitFileExcel() {
    let assetregserv = this.assetsRegistrationService
    this.spinner.show();
    this.dataFromExcelFile.forEach(function (loopval, index) {

      let checkStatus = 'CO'
      const formData = new FormData();

      // formData.asset_owning_department = loopval.asset_owning_department
      formData.append('asset_owning_department', (loopval.asset_owning_department != undefined ? loopval.asset_owning_department : ''));
      formData.append('main_operation', (loopval.main_operation != undefined ? loopval.main_operation : ''))
      formData.append('region', (loopval.region != undefined ? loopval.region : ''))
      formData.append('operation', (loopval.operation != undefined ? loopval.operation : ''))
      formData.append('parent_location', (loopval.parent_location != undefined ? loopval.parent_location : ''))
      formData.append('process_function', (loopval.process_function != undefined ? loopval.process_function : ''))
      formData.append('sub_process_system', (loopval.sub_process_system != undefined ? loopval.sub_process_system : ''))
      formData.append('asset_or_component_type', (loopval.asset_or_component_type != undefined ? loopval.asset_or_component_type : ''))
      formData.append('asset_class_asset_category', (loopval.asset_class_asset_category != undefined ? loopval.asset_class_asset_category : ''))
      formData.append('handed_over_asset_or_procured', (loopval.handed_over_asset_or_procured != undefined ? loopval.handed_over_asset_or_procured : ''))
      formData.append('asset_primary_category', (loopval.asset_primary_category != undefined ? loopval.asset_primary_category : ''))
      formData.append('asset_identity', (loopval.asset_identity != undefined ? loopval.asset_identity : ''))
      formData.append('location_description', (loopval.location_description != undefined ? loopval.location_description : ''))
      formData.append('building', (loopval.building != undefined ? loopval.building : ''))
      formData.append('address_line_1', (loopval.address_line_1 != undefined ? loopval.address_line_1 : ''))
      formData.append('address_line_2', (loopval.address_line_2 != undefined ? loopval.address_line_2 : ''))
      formData.append('address_line_3', (loopval.address_line_3 != undefined ? loopval.address_line_3 : ''))
      formData.append('city', (loopval.city != undefined ? loopval.city : ''))
      formData.append('state', (loopval.state != undefined ? loopval.state : ''))
      formData.append('postal_code', (loopval.postal_code != undefined ? loopval.postal_code : ''))
      formData.append('country', (loopval.country != undefined ? loopval.country : ''))
      formData.append('tag_number', (loopval.tag_number != undefined ? loopval.tag_number : ''))
      formData.append('service_area', (loopval.service_area != undefined ? loopval.service_area : ''))
      formData.append('location_main_contact', (loopval.location_main_contact != undefined ? loopval.location_main_contact : ''))
      formData.append('location_asset_maintenance_manager', (loopval.location_asset_maintenance_manager != undefined ? loopval.location_asset_maintenance_manager : ''))
      formData.append('maintenance_planner', (loopval.maintenance_planner != undefined ? loopval.maintenance_planner : ''))
      formData.append('gis_esri_id', (loopval.gis_esri_id != undefined ? loopval.gis_esri_id : ''))
      formData.append('latitude', (loopval.latitude != undefined ? loopval.latitude : ''))
      formData.append('longitude', (loopval.longitude != undefined ? loopval.longitude : ''))
      formData.append('asset_critically', (loopval.asset_criticality != undefined ? loopval.asset_criticality : ''))
      formData.append('cost_center', (loopval.cost_center != undefined ? loopval.cost_center : ''))
      formData.append('sub_category_1', (loopval.sub_category_1 != undefined ? loopval.sub_category_1 : ''))
      formData.append('sub_category_2', (loopval.sub_category_2 != undefined ? loopval.sub_category_2 : ''))
      formData.append('brand', (loopval.brand != undefined ? loopval.brand : ''))
      formData.append('model_number', (loopval.model_number != undefined ? loopval.model_number : ''))
      formData.append('size_capacity_1', (loopval.size_capacity_1 != undefined ? loopval.size_capacity_1 : ''))
      formData.append('size_capacity_1_unit_measurement', (loopval.size_capacity_1_unit_measurement != undefined ? loopval.size_capacity_1_unit_measurement : ''))
      formData.append('size_capacity_2', (loopval.size_capacity_2 != undefined ? loopval.size_capacity_2 : ''))
      formData.append('size_capacity_2_unit_measurement', (loopval.size_capacity_2_unit_measurement != undefined ? loopval.size_capacity_2_unit_measurement : ''))
      formData.append('size_capacity_3', (loopval.size_capacity_3 != undefined ? loopval.size_capacity_3 : ''))
      formData.append('size_capacity_3_unit_measurement', (loopval.size_capacity_3_unit_measurement != undefined ? loopval.size_capacity_3_unit_measurement : ''))
      formData.append('parent_asset_plate_number', (loopval.parent_asset_plate_number != undefined ? loopval.parent_asset_plate_number : ''))
      formData.append('asset_plate_number', (loopval.asset_plate_number != undefined ? loopval.asset_plate_number : ''))
      formData.append('detailed_description ', (loopval.detailed_description != undefined ? loopval.detailed_description : ''))
      formData.append('serial_number', (loopval.serial_number != undefined ? loopval.serial_number : ''))
      formData.append('asset_tag_number', (loopval.asset_tag_number != undefined ? loopval.asset_tag_number : ''))
      formData.append('purchase_date_installed_handed_over_date', (loopval.purchase_date_installed_handed_over_date != undefined ? loopval.purchase_date_installed_handed_over_date : ''))
      formData.append('condition_rating', (loopval.condition_rating != undefined ? loopval.condition_rating : ''))
      formData.append('asset_status', (loopval.asset_status != undefined ? loopval.asset_status : ''))
      formData.append('maintenance_specification', (loopval.maintenance_specification != undefined ? loopval.maintenance_specification : ''))
      formData.append('measurement_type', (loopval.measurement_type != undefined ? loopval.measurement_type : ''))
      formData.append('warranty', (loopval.warranty != undefined ? loopval.warranty : ''))
      formData.append('actual_warranty_period', (loopval.actual_warranty_period != undefined ? loopval.actual_warranty_period : ''))
      formData.append('warranty_vendor_name', (loopval.warranty_vendor_name != undefined ? loopval.warranty_vendor_name : ''))
      formData.append('bottom_water_level', (loopval.bottom_water_level != undefined ? loopval.bottom_water_level : ''))
      formData.append('closing_torque', (loopval.closing_torque != undefined ? loopval.closing_torque : ''))
      formData.append('dimention', (loopval.dimention != undefined ? loopval.dimention : ''))
      formData.append('frequency', (loopval.frequency != undefined ? loopval.frequency : ''))
      formData.append('infrastructure_status', (loopval.infrastructure_status != undefined ? loopval.infrastructure_status : ''))
      formData.append('installation', (loopval.installation != undefined ? loopval.installation : ''))
      formData.append('manufacturer', (loopval.manufacturer != undefined ? loopval.manufacturer : ''))
      formData.append('material_type', (loopval.material_type != undefined ? loopval.material_type : ''))
      formData.append('no_of_channel', (loopval.no_of_channel != undefined ? loopval.no_of_channel : ''))
      formData.append('opening_torque', (loopval.opening_torque != undefined ? loopval.opening_torque : ''))
      formData.append('pump_head', (loopval.pump_head != undefined ? loopval.pump_head : ''))
      formData.append('staging_height', (loopval.staging_height != undefined ? loopval.staging_height : ''))
      formData.append('top_water_level', (loopval.top_water_level != undefined ? loopval.top_water_level : ''))
      formData.append('valve_pressure_rating', (loopval.valve_pressure_rating != undefined ? loopval.valve_pressure_rating : ''))
      formData.append('vehicle_engine_number', (loopval.vehicle_engine_number != undefined ? loopval.vehicle_engine_number : ''))
      formData.append('vehicle_insurance_auto_windscreen_insured', (loopval.vehicle_insurance_auto_windscreen_insured != undefined ? loopval.vehicle_insurance_auto_windscreen_insured : ''))
      formData.append('vehicle_insurance_date_period_to', (loopval.vehicle_insurance_date_period_to != undefined ? loopval.vehicle_insurance_date_period_to : ''))
      formData.append('vehicle_insurance_sum_insured', (loopval.vehicle_insurance_sum_insured != undefined ? loopval.vehicle_insurance_sum_insured : ''))
      formData.append('vehicle_owner_status', (loopval.vehicle_owner_status != undefined ? loopval.vehicle_owner_status : ''))
      formData.append('vehicle_puspakom_expired_date', (loopval.vehicle_puspakom_expired_date != undefined ? loopval.vehicle_puspakom_expired_date : ''))
      formData.append('vehicle_roadtax_expired_date', (loopval.vehicle_roadtax_expired_date != undefined ? loopval.vehicle_roadtax_expired_date : ''))
      formData.append('vehicle_seating_capacity', (loopval.vehicle_seating_capacity != undefined ? loopval.vehicle_seating_capacity : ''))
      formData.append('communication_protocol', (loopval.communication_protocol != undefined ? loopval.communication_protocol : ''))
      formData.append('environmental_performance', (loopval.environmental_performance != undefined ? loopval.environmental_performance : ''))
      formData.append('horse_power', (loopval.horse_power != undefined ? loopval.horse_power : ''))
      formData.append('infrastructure_status_reason', (loopval.infrastructure_status_reason != undefined ? loopval.infrastructure_status_reason : ''))
      formData.append('insulation', (loopval.insulation != undefined ? loopval.insulation : ''))
      formData.append('manufacturer_year', (loopval.manufacturer_year != undefined ? loopval.manufacturer_year : ''))
      formData.append('model', (loopval.model != undefined ? loopval.model : ''))
      formData.append('no_of_phases', (loopval.no_of_phases != undefined ? loopval.no_of_phases : ''))
      formData.append('outlet_diameter', (loopval.outlet_diameter != undefined ? loopval.outlet_diameter : ''))
      formData.append('revolutions_per_minute', (loopval.revolutions_per_minute != undefined ? loopval.revolutions_per_minute : ''))
      formData.append('supply_location', (loopval.supply_location != undefined ? loopval.supply_location : ''))
      formData.append('type', (loopval.type != undefined ? loopval.type : ''))
      formData.append('vehicle_chasis_number', (loopval.vehicle_chassis_number != undefined ? loopval.vehicle_chassis_number : ''))
      formData.append('vehicle_insurance_vendor', (loopval.vehicle_insurance_vendor != undefined ? loopval.vehicle_insurance_vendor : ''))
      formData.append('vehicle_insurance_cover_note_number', (loopval.vehicle_insurance_cover_note_number != undefined ? loopval.vehicle_insurance_cover_note_number : ''))
      formData.append('vehicle_insurance_no_claim_discount', (loopval.vehicle_insurance_no_claim_discount != undefined ? loopval.vehicle_insurance_no_claim_discount : ''))
      formData.append('vehicle_insurance_total_premium', (loopval.vehicle_insurance_total_premium != undefined ? loopval.vehicle_insurance_total_premium : ''))
      formData.append('vehicle_register_date', (loopval.vehicle_register_date != undefined ? loopval.vehicle_register_date : ''))
      formData.append('vehicle_spad_permit_date_period_to', (loopval.vehicle_spad_permit_date_period_to != undefined ? loopval.vehicle_spad_permit_date_period_to : ''))
      formData.append('vehicle_spad_no_license_operator', (loopval.vehicle_spad_no_license_operator != undefined ? loopval.vehicle_spad_no_license_operator : ''))
      formData.append('vehicle_registration_owner', (loopval.vehicle_registration_owner != undefined ? loopval.vehicle_registration_owner : ''))
      formData.append('capacity_size', (loopval.capacity_size != undefined ? loopval.capacity_size : ''))
      formData.append('coverage_range', (loopval.coverage_range != undefined ? loopval.coverage_range : ''))
      formData.append('flow_rate', (loopval.flow_rate != undefined ? loopval.flow_rate : ''))
      formData.append('hysteresis', (loopval.hysteresis != undefined ? loopval.hysteresis : ''))
      formData.append('inlet_diameter', (loopval.inlet_diameter != undefined ? loopval.inlet_diameter : ''))
      formData.append('legal_name', (loopval.legal_name != undefined ? loopval.legal_name : ''))
      formData.append('manufacture_part_number', (loopval.manufacture_part_number != undefined ? loopval.manufacture_part_number : ''))
      formData.append('motor_current', (loopval.motor_current != undefined ? loopval.motor_current : ''))
      formData.append('no_of_stage', (loopval.no_of_stage != undefined ? loopval.no_of_stage : ''))
      formData.append('power_supply_type', (loopval.power_supply_type != undefined ? loopval.power_supply_type : ''))
      formData.append('source_from', (loopval.source_from != undefined ? loopval.source_from : ''))
      formData.append('temperature', (loopval.temperature != undefined ? loopval.temperature : ''))
      formData.append('valve_diameter', (loopval.valve_diameter != undefined ? loopval.valve_diameter : ''))
      formData.append('vehicle_engine_capacity', (loopval.vehicle_engine_capacity != undefined ? loopval.vehicle_engine_capacity : ''))
      formData.append('vehicle_model', (loopval.vehicle_model != undefined ? loopval.vehicle_model : ''))
      formData.append('vehicle_insurance_date_period_from', (loopval.vehicle_insurance_date_period_from != undefined ? loopval.vehicle_insurance_date_period_from : ''))
      formData.append('vehicle_insurance_policy_type', (loopval.vehicle_insurance_policy_type != undefined ? loopval.vehicle_insurance_policy_type : ''))
      formData.append('vehicle_puspakom_date_inspection', (loopval.vehicle_puspakom_date_inspection != undefined ? loopval.vehicle_puspakom_date_inspection : ''))
      formData.append('vehicle_roadtax_rate', (loopval.vehicle_roadtax_rate != undefined ? loopval.vehicle_roadtax_rate : ''))
      formData.append('vehicle_roadtax_renew_date', (loopval.vehicle_roadtax_renew_date != undefined ? loopval.vehicle_roadtax_renew_date : ''))
      formData.append('vehicle_spad_permit_date_period_from', (loopval.vehicle_spad_permit_date_period_from != undefined ? loopval.vehicle_spad_permit_date_period_from : ''))
      formData.append('voltage', (loopval.voltage != undefined ? loopval.voltage : ''))

      formData.forEach(function (loopvaldata) {
        // console.log('loopvaldata = ', loopvaldata)
        if (loopvaldata == '') {
          checkStatus = 'IC'
        }
      })

      formData.append('status', checkStatus)

      // console.log('formData = ', formData);
      // dalam foreach
      assetregserv.post(formData).subscribe(
        (res) => {
          // console.log("res = ", res);
        },
        error => {
          console.error("err", error);
        }
      )

    })
    this.spinner.hide();
    swal
      .fire({
        title: "Success",
        text: "The submission has successfully recorded",
        type: "success",
      }).then((result) => {
        this.getRegisteredData()
      });
    this.closeModal()
  }

  getRegisteredData() {
    let tempData = []
    this.assetsRegistrationService.getNewRegList().subscribe(
      (res) => {
        console.log("res all data", res);
        res.forEach(function (val) {
          val['isTick'] = false
          tempData.push(val)
        })
        console.log('tempData = ', tempData)
        this.tableTemp1 = tempData
      },
      error => {
        console.error("err", error);
      }
    )
  }

 AssetChange() {
   let tempData = [];
   this.assetsAttributeColumnService.get().subscribe(
     (res) => {
       res.forEach(function(assetprimer){
         // console.log("asset primary uina =",assetprimer);
         tempData.push(assetprimer)
       })
       this.assetprimarycolumnselector = tempData
       let assetprimaryregister1 = (<HTMLInputElement>document.getElementById('assetselector')).value;
       // let assetprimaryregister1 = this.assetprimarycategory.map(b => b.value);
       let assetprimaryregister2 = this.assetprimarycolumnselector.map(a => a.asset_type_id);

       // console.log("asset = ",assetprimaryregister2);

       if (assetprimaryregister2.indexOf(assetprimaryregister1) !== -1) {
         console.log("there is match");
         this.assetprimaryselector = this.assetprimarycolumnselector.filter(function (primary) {
           return primary.asset_type_id == assetprimaryregister1;
         })

       this.assetprimaryselectorshow = Object.values(this.assetprimaryselector)
       console.log("assetprimaryselectshow = ", this.assetprimaryselectorshow)


       }
       else {
         this.assetprimaryselectorshow = this.assetprimaryselectorshowdefault
         console.log("there is no match");
       }
     },
     error => {
         console.error("err", error);
       }
     )

 }

  onChange() {
    let counter = 0
    for (let x in this.is_show1) {
      if (this.is_show1[x]) {
        counter++
      }
    }

    if (counter < 1) {
      this.tableShow1 = false
    }
  }

  checkRow(selected) {
    let tempData = []
    // console.log('test test tetst')
    this.tableTemp1.forEach(
      (item) => {
        if (item['id'] == selected['id']) {
          // console.log('item b4 = ', item)
          item['isTick'] = item['isTick']
          // console.log('item after = ', item)
          tempData.push(item)
        } else {
          tempData.push(item)
        }
      }
    )
    // console.log('tempDataqweqe = ', tempData)
    this.tableTemp1 = tempData
  }

  confirm(task) {

    swal.fire({
      title: 'Are you sure?',
      text: 'To change the status.',
      type: 'warning',
      buttonsStyling: false,
      showCancelButton: true,
      confirmButtonText: 'Yes, submit it',
      confirmButtonClass: 'btn btn-warning',
      cancelButtonText: 'Cancel',
      cancelButtonClass: 'btn btn-secondary'
    }).then((result) => {
      console.log('result = ', result.value)
      if (result.value == true) {
        this.changeStatus(task)
      }
    })
  }

  changeStatus(task) {
    let resData: any
    // console.log('this.task = ', task)
    let no = 0
    let assetregser = this.assetsRegistrationService
    this.tableTemp1.forEach(function (itemVal) {

      if (itemVal['isTick'] == true) {

        console.log('itemVal = ', itemVal.status)
        if (itemVal.status == 'CO') {
          // const updateformData = new FormData();
          let updateformData: any
          // updateformData.append('status', 'PR');

          updateformData = {
            status: task
          }
          // console.log('updateformData = ', updateformData)

          // console.log('---- sini ----')
          assetregser.update(itemVal['id'], updateformData).subscribe(
            (res) => {
              // console.log("ttttatttatt = ", res);
            },
            error => {
              console.error("err", error);
            }
          )
        } else {
          no++
        }
      }
    })

    if (no > 0) {
      swal.fire({
        title: 'Warning',
        text: 'The incomplete data cannot be save.',
        type: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'Ok',
        confirmButtonClass: 'btn btn-warning'
      }).then((result) => {
        this.getRegisteredData()
      })
    } else {
      swal.fire({
        title: 'Success',
        text: 'Successfully Change Status',
        type: 'success',
        buttonsStyling: false,
        confirmButtonText: 'Ok',
        confirmButtonClass: 'btn btn-success'
      }).then((result) => {
        this.getRegisteredData()
      })
    }
  }

  onKey(event, formName, row) {
    // console.log('event = ', event);
    // console.log('formName = ', formName);
    // console.log('row = ', row['id']);
    let updateformData: any = {}
    let updateStatusComplete: any = {}
    let updateStatus = 'yes'
    // updateformData.append(formName, event);
    // updateformData = {
    //   cendol: event
    // }
    updateformData[formName] = event

    this.assetsRegistrationService.update(row['id'], updateformData).subscribe(
      (res) => {
        this.resOnkeyData = res
        console.log("assetsRegistrationService = ", this.resOnkeyData);
        for (var key in this.resOnkeyData) {
          // console.log('-----------')
          // console.log(this.resOnkeyData[key]);
          if (this.resOnkeyData[key] == '') {
            updateStatus = 'no'
            console.log('+++++++++++++')
            // console.log('----- qweqweqwe -----', key)
          }
        }
        console.log('updateStatus = ', updateStatus)
        if (updateStatus == 'yes') {
          updateStatusComplete['status'] = 'CO'
          this.assetsRegistrationService.update(row['id'], updateStatusComplete).subscribe(
            (res) => {
              // console.log('yeaahhaaaaaaa CO')
              this.getRegisteredData()
            }
          )
        } else {
          updateStatusComplete['status'] = 'IC'
          this.assetsRegistrationService.update(row['id'], updateStatusComplete).subscribe(
            (res) => {
              // console.log('yeaahhaaaaaaa IC')
              this.getRegisteredData()
            }
          )
        }
      },
      error => {
        console.error("err", error);
      }
    )
  }

  // getAssetPrimaryCategory() {
  //   this.assetAttribute.forEach(function (lll, mm) {
  //     console.log('test test = ', lll.asset_primary_category)
  //   })
  // }
}
