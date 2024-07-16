import { CollectionConfig } from 'payload/types';

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'username',
  },
  fields: [
    {
      name: 'username',
      type: 'text',
      required: true,
      unique: true,
      label: 'Username',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'fullName',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'address',
      type: 'group',
      fields: [
        {
          name: 'street',
          type: 'text',
          required: true,
          label: 'Street',
        },
        {
          name: 'city',
          type: 'text',
          required: true,
          label: 'City',
        },
        {
          name: 'state',
          type: 'text',
          required: true,
          label: 'State',
        },
        {
          name: 'zipCode',
          type: 'text',
          required: true,
          label: 'Zip Code',
        },
        {
          name: 'country',
          type: 'text',
          required: true,
          label: 'Country',
        },
      ],
    },
    {
      name: 'phoneNumber',
      type: 'text',
      required: true,
      label: 'Phone Number',
    },
    {
      name: 'orders',
      type: 'array',
      fields: [
        {
          name: 'orderId',
          type: 'text',
          required: true,
          label: 'Order ID',
        },
        {
          name: 'date',
          type: 'date',
          required: true,
          label: 'Order Date',
        },
        {
          name: 'totalAmount',
          type: 'number',
          required: true,
          label: 'Total Amount',
        },
      ],
    },
  ],
};

export default Users;
