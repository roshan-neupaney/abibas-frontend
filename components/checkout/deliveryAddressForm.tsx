"use client";
import { ButtonWithShadow } from "@/subcomponents/button";
import CustomInput from "@/subcomponents/input";
import CustomSelect from "@/subcomponents/select";
import { updateState } from "@/utilities/helper";
import React, { useEffect, useState } from "react";
import RightArrowIcon from "../../public/icon/right-arrow-white.svg";

const defaultForm = {
  firstName: "",
  lastName: "",
  province: "",
  district: "",
  municipality: "",
  ward: "",
  phone: "",
};
const defaultError = {
  firstName: "",
  lastName: "",
  address: "",
  phone: "",
};

const DeliveryAddressForm = ({ Locations }: any) => {
  const [formData, setFormData] = useState(defaultForm);
  const [formError, setFormError] = useState(defaultError);
  const [beautifiedDistricts, setBeautifiedDistricts] = useState([]);
  const [beautifiedMunicipality, setBeautifiedMunicipality] = useState([]);
  const [beautifiedWard, setBeautifiedWard] = useState([]);

  const beautifiedProvinces = Locations.map((items: any) => {
    return { id: items.id, label: items.name };
  });

  useEffect(() => {
    Locations.filter((items: any) => {
      if (items.id === formData.province)
        setBeautifiedDistricts(
          items.districts.map((item: any) => {
            return {
              id: item.id,
              label: item.name,
              municipality: item.municipalities,
            };
          })
        );
    });
  }, [formData.province]);

  useEffect(() => {
    beautifiedDistricts.filter((district: any) => {
      if (district.id === formData.district)
        setBeautifiedMunicipality(
          district.municipality.map((muni: any) => {
            return { id: muni.id, label: muni.name, ward: muni.wards };
          })
        );
    });
  }, [formData.district]);

  useEffect(() => {
    beautifiedMunicipality.filter((muni: any) => {
      if (muni.id === formData.municipality)
        setBeautifiedWard(
          muni.ward.map((ward: any) => {
            return { id: ward, label: ward };
          })
        );
    });
  }, [formData.municipality]);

  return (
    <div className="mt-8">
      <div className="font-bold">Delivery Address</div>
      <div className="flex flex-col mt-4 gap-8">
        <div className="grid grid-cols-1 media-600:grid-cols-2 gap-y-8 gap-x-4">
          <CustomInput
            title="Firstname"
            value={formData.firstName}
            onChange={(val: string) =>
              updateState("firstName", val, setFormData, setFormError)
            }
            required
            error={formError.firstName}
            placeholder="John"
            className="col-span-1"
          />
          <CustomInput
            title="Lastname"
            value={formData.lastName}
            onChange={(val: string) =>
              updateState("lastName", val, setFormData, setFormError)
            }
            required
            error={formError.lastName}
            placeholder="Doe"
            className="col-span-1"
          />

          <CustomSelect
            title="Province"
            value={formData.province}
            onChange={(val: string) =>
              updateState("province", val, setFormData, setFormError)
            }
            data={beautifiedProvinces}
            required
            error={formError.address}
            placeholder="Select a Province"
            className="col-span-1"
          />
          <CustomSelect
            title="District"
            value={formData.district}
            onChange={(val: string) =>
              updateState("district", val, setFormData, setFormError)
            }
            required
            data={beautifiedDistricts}
            error={formError.address}
            placeholder={`${
              formData.province?.length > 0
                ? "Select a district"
                : "Please select a province first"
            }`}
            className="col-span-1"
          />
          <CustomSelect
            title="Municipality"
            value={formData.municipality}
            onChange={(val: string) =>
              updateState("municipality", val, setFormData, setFormError)
            }
            data={beautifiedMunicipality}
            required
            error={formError.address}
            placeholder={`${
              formData.district?.length > 0
                ? "Select a district"
                : "Please select a district first"
            }`}
            className="col-span-1"
          />
          <CustomSelect
            title="Ward No."
            value={formData.ward}
            onChange={(val: string) => updateState("ward", val, setFormData)}
            required
            data={beautifiedWard}
            error={formError.address}
            placeholder={`${
              formData.municipality?.length > 0
                ? "Select a Municipality"
                : "Please select a municipality first"
            }`}
            className="col-span-1"
          />
          <CustomInput
            title="Phone"
            value={formData.phone}
            onChange={(val: string) =>
              updateState("phone", val, setFormData, setFormError)
            }
            required
            error={formError.phone}
            type="number"
            placeholder="98xxxxxxxx"
            className="col-span-1"
          />
        </div>
      </div>
      <ButtonWithShadow
        title="Place a order"
        sideIcon={RightArrowIcon}
        iconHeight={40}
        iconWidth={30}
        className="mt-8"
      />
    </div>
  );
};

export default DeliveryAddressForm;
