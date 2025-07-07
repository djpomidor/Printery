import * as yup from 'yup';

export const schema = yup.object().shape({
    orderId: yup.string().required('Это поле не может быть пустым'),
    nameOfOrder: yup.string().required('Это поле не может быть пустым'),
    printed_sheets: yup.string(),
    circulation: yup.string(),
    circulation_sheets: yup.string(),
    binding: yup.string(),
    width: yup.number(),
    height: yup.number(),
    parts: yup.array().of(
      yup.object().shape({
        part_name: yup.string(),
        pages: yup.number(),
        color: yup.string(),
        paper_id: yup.number(),
        paper_density: yup.string(),
        printing: yup.array().of(
          yup.object().shape({
            printed_sheets: yup.number().required(),
            circulation_sheets: yup.number().required(),
            parent_day: yup.string(),
            machine: yup.number(),
  
          })
        )
      })
    ),
    // terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
  });

const today = new Date();

  export const initialValues={
    nameOfOrder: '',
    typeOfOrder: '',
    circulation: '',
    binding: '',
    width: '',
    height: '',
    parts: [
      {
        part_name: 'BLO',
        pages: 1,
        color: '',
        paper: {
          name: "",
          type: "",
          density: 0,
          width: 0,
          height: 0
          },
        printing: [
          {
            printed_sheets: 0,
            circulation_sheets: 0,
            parent_day: '',
            machine: '',
          }
        ]
      },
      {
        part_name: 'COV',
        pages: '',
        color: '',
        paper: {
          name: "",
          type: "",
          density: 0,
          width: 0,
          height: 0
          },
        paper_density: '',
        printing: [
          {
            printed_sheets: 0,
            circulation_sheets: 0,
            parent_day: '',
            machine: '',
          }
        ]
        
      },
      {
        part_name: 'INS',
        pages: '',
        color: '',
        paper: {
          name: "",
          type: "",
          density: 0,
          width: 0,
          height: 0
          },
        paper_density: '',
        printing: [
          {
            printed_sheets: 0,
            circulation_sheets: 0,
            parent_day: '',
            machine: '',
          }
        ]
      },
    ],
    created: '',
    terms: false,
  }