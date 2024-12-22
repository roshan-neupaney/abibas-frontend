"use client";
import { ButtonWithShadow } from "@/subcomponents/button";
import CustomInput from "@/subcomponents/input";
import CustomSelect from "@/subcomponents/select";
import { updateState } from "@/utilities/helper";
import React, { useEffect, useState } from "react";
import RightArrowIcon from "../../public/icon/right-arrow-white.svg";
import toast from "react-hot-toast";
import useStore from "../../zustand/store";
import { JsonPost } from "@/utilities/apiCalls";
import { CRUD_ORDER } from "../../config/endpoints";
import clearCachesByServerAction from "../../hooks/revalidate";
import { useRouter } from "next/navigation";
import { AddOrderValidation } from "@/utilities/validation";

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
  province: "",
  district: "",
  municipality: "",
  phone: "",
};

const DeliveryAddressForm = ({ Locations, cartItems, tax, totalPrice, token, deliveryCharge, itemsPrice }: any) => {
  const [formData, setFormData] = useState(defaultForm);
  const [formError, setFormError] = useState(defaultError);
  const [beautifiedDistricts, setBeautifiedDistricts] = useState([]);
  const [beautifiedMunicipality, setBeautifiedMunicipality] = useState([]);
  const [beautifiedWard, setBeautifiedWard] = useState([]);
  const [loading, setLoading] = useState(false)

  const { toggleLoginModalTrue } = useStore();
  const router = useRouter();

  const beautifiedProvinces = Locations.map((items: any) => {
    return { id: items.name, label: items.name };
  });

  useEffect(() => {
    Locations.filter((items: any) => {
      if (items.name === formData.province)
        setBeautifiedDistricts(
          items.districts.map((item: any) => {
            return {
              id: item.name,
              label: item.name,
              municipality: item.municipalities,
            };
          })
        );
    });
  }, [formData.province, Locations]);

  useEffect(() => {
    beautifiedDistricts.filter((district: any) => {
      if (district.id === formData.district)
        setBeautifiedMunicipality(
          district.municipality.map((muni: any) => {
            return { id: muni.name, label: muni.name, ward: muni.wards };
          })
        );
    });
  }, [formData.district, beautifiedDistricts]);

  useEffect(() => {
    beautifiedMunicipality.filter((muni: any) => {
      if (muni.id === formData.municipality)
        setBeautifiedWard(
          muni.ward.map((ward: any) => {
            return { id: ward.toString(), label: ward };
          })
        );
    });
  }, [formData.municipality, beautifiedMunicipality]);

  const itemsToOrder = cartItems.map((items: any) => {
    return {
      price: items.shoe.price,
      size: items.size,
      shoe_id: items.shoe.id,
      color_variation_id: items.colorVariation.id,
      count: items.count
    }
  })
  const beautifyPayload = (data: Record<string, string>) => {
    const payload = {
      firstName: "",
      lastName: "",
      province: "",
      district: "",
      municipality: "",
      ward: "",
      phone: "",
      total_amount: "",
      items_total_price: "",
      tax_amount: "",
      delivery_charge: "",
      orderItems: [],
    };
    payload.firstName = data.firstName;
    payload.lastName = data.lastName;
    payload.province = data.province;
    payload.district = data.district;
    payload.municipality = data.municipality;
    payload.ward = data.ward;
    payload.phone = data.phone;
    payload.total_amount = totalPrice;
    payload.items_total_price = itemsPrice;
    payload.tax_amount = tax;
    payload.delivery_charge = deliveryCharge;
    payload.orderItems = itemsToOrder;
    return payload;
  };

  const handleCartSubmit = async () => {
    setLoading(true);
    try {
      const beautifiedPayload = beautifyPayload(formData);
      const { isValid, error } = AddOrderValidation(beautifiedPayload);
      if (isValid) {
        const res = await JsonPost(CRUD_ORDER, beautifiedPayload, token);
        const { status, statusCode, data }: any = res;
        if (status) {
          toast.success("Order placed successfully");
          clearCachesByServerAction('/checkout')
          setFormError(defaultError);
          setLoading(false);
          setFormData(defaultForm)
          router.push('/payment/' + data.id);
        } else if (statusCode === 401) {
          toggleLoginModalTrue();
          setLoading(false);
        } else {
          setLoading(false);
          toast.error("Error while placing an order");
        }
      } else {
        setLoading(false);
        toast.error("Validation Error");
        setFormError(error);
      }
    } catch (e) {
      console.error(e);
    }
  };

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
            error={formError.province}
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
            error={formError.district}
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
            error={formError.municipality}
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
            data={beautifiedWard}
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
        disabled={loading}
        onClick={handleCartSubmit}
      />
    </div>
  );
};

export default DeliveryAddressForm;
