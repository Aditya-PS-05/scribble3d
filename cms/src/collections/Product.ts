import { CollectionConfig } from 'payload/types';

const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Product Name',
    },
    {
      name: 'imageUrl',
      type: 'text',
      required: true,
      label: 'Product Image',
    },
    {
      name: 'price',
      type: 'group',
      fields: [
        {
          name: 'current',
          type: 'number',
          required: true,
          label: 'Current Price',
        },
        {
          name: 'original',
          type: 'number',
          required: true,
          label: 'Original Price',
        },
        {
          name: 'discountPercentage',
          type: 'number',
          required: true,
          label: 'Discount Percentage',
        },
      ],
    },
    {
      name: 'customisable',
      type: 'checkbox',
      required: true,
      label: 'Customisable',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Product Description',
    },
  ],
};

export default Products;
