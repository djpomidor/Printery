import * as yup from 'yup';

export const schema = yup.object().shape({
    orderId: yup.string().required(),
    nameOfOrder: yup.string().required(),
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
            printed_sheets: yup.number(),
            circulation_sheets: yup.number(),
            parent_day: yup.string(),
            machine: yup.number(),
  
          })
        )
      })
    ),
    terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
  });

export const initialValues={
    orderId: '',
    nameOfOrder: '',
    // typeOfOrder: '',
    circulation: 0,
    // circulation_sheets: '',
    // printed_sheets: '',
    binding: '',
    width: 0,
    height: 0,
    parts: [
      {
        part_name: 'BLO',
        pages: 1,
        color: '',
        paper: 
          {
            type: '',
            density: 100,
          }
        ,
        printing: [
          {
            printed_sheets: 0,
            circulation_sheets: 0,
            parent_day: 'вт, 31.10_night',
            machine: '',
          }
        ]
      },
      {
        part_name: 'COV',
        pages: '',
        color: '',
        paper: 
          {
            type: '',
            density: '',
          },
        printing: [
          {
            printed_sheets: 0,
            circulation_sheets: 0,
            parent_day: 'сб, 28.10_night',
            machine: '',
          }
        ]            
      },
      {
        part_name: 'INS',
        pages: '',
        color: '',
        paper: 
          {
            type: '',
            density: '',
          },
        printing: [
          {
            printed_sheets: 0,
            circulation_sheets: 0,
            parent_day: 'сб, 28.10_night',
            machine: '',
          }
        ]            
      },
    ],
    created: '',
    terms: false,
  }