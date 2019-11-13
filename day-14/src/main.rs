use std::convert::TryInto;

fn main() {
    let seq_to_find: Vec<u32> = vec![5, 5, 4, 4, 0, 1];
    let mut recipe_list = vec![3, 7];
    let mut first_elf = 0;
    let mut second_elf = 1;

    loop {
        if recipe_list.len() > seq_to_find.len() {
            let offset = recipe_list.len() - seq_to_find.len();
            if &seq_to_find[..] == &recipe_list[offset..] {
                println!("there are {} recipes to the left of the sequence", offset);
                break;
            }

            if &seq_to_find[..] == &recipe_list[offset - 1..recipe_list.len() - 1] {
                println!(
                    "there are {} recipes to the left of the sequence",
                    offset - 1
                );
                break;
            }
        }

        // if recipe_list.len() > 25 {
        //     let offset = recipe_list.len() - seq_to_find.len();
        //     println!("recipe list: {:?}", recipe_list);
        //     println!(
        //         "with offset: {:?}",
        //         &recipe_list[offset - 1..recipe_list.len() - 1]
        //     );
        //     break;
        // }

        if recipe_list.len() % 1000 == 0 {
            println!("{}", recipe_list.len());
        }

        let sum: u32 = recipe_list[first_elf] + recipe_list[second_elf];
        let mut sum_list: Vec<u32> = sum
            .to_string()
            .chars()
            .map(|d| d.to_digit(10).unwrap())
            .collect::<Vec<_>>();

        recipe_list.append(&mut sum_list);

        let first_move_by: usize = (1 + recipe_list[first_elf]).try_into().unwrap();
        first_elf = (first_elf + first_move_by) % recipe_list.len();

        let second_move_by: usize = (1 + recipe_list[second_elf]).try_into().unwrap();
        second_elf = (second_elf + second_move_by) % recipe_list.len();
    }
}
