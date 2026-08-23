export type FaqItem = {
	question: string;
	answer: string;
};

export type FaqCategory = {
	title: string;
	items: FaqItem[];
};

export const faqCategories: FaqCategory[] = [
	{
		title: "About Glossyplace Jewellery",
		items: [
			{
				question: "Is Glossyplace jewellery handmade?",
				answer:
					"Yes. I create every piece of Glossyplace jewellery by hand, carefully selecting the stones, arranging each design and paying attention to every finishing detail. My jewellery is not mass-produced – each bracelet and necklace is individually made.",
			},
			{
				question: "Does every bracelet look exactly the same?",
				answer:
					"No – and that is part of what makes each piece special. Natural stones vary in shade, pattern, texture and transparency, which means no two pieces are ever completely identical. The jewellery you receive is truly one of a kind.",
			},
			{
				question: "Is the jewellery made to order?",
				answer:
					"Many Glossyplace designs are created especially after an order is placed. This allows me to make the bracelet in your chosen size while preserving the individual character of every piece. Details for each design can be found on the individual product page.",
			},
			{
				question: "How do I choose the right bracelet size?",
				answer:
					"Measure your wrist with a soft measuring tape, keeping it close to the skin without adding any extra allowance. Then choose your size according to the size guide. If you are between two sizes, please contact me and I will be happy to help you choose the best fit.",
			},
		],
	},
	{
		title: "Stones and Their Energy",
		items: [
			{
				question: "How do I choose the right stones for me?",
				answer:
					"You can choose stones based on their properties, symbolism, colour or simply your intuition. Sometimes a particular stone catches your attention from the very first moment. I believe jewellery can be more than just an accessory – it can become a personal talisman that reminds you of your intention and what you need at a particular moment in your life.",
			},
			{
				question: "Which stone should I choose for love, protection, calm, confidence or prosperity?",
				answer:
					"It all depends on your intention. Rose Quartz is traditionally associated with love and emotional harmony, Black Tourmaline and Obsidian with protection, Howlite and Amethyst with calm and balance, Tiger's Eye with courage and confidence, and Citrine and Aventurine with prosperity, good fortune and positive energy. You do not have to choose just one stone. A carefully selected combination can create a talisman representing several intentions at the same time.",
			},
			{
				question: "Can different stones be combined in one bracelet?",
				answer:
					"Yes. Combining different stones is one of the most important elements of my designs. I select them to create a harmonious whole, both visually and in terms of their traditionally attributed properties. This allows one bracelet to represent several complementary intentions.",
			},
		],
	},
	{
		title: "Your Talisman",
		items: [
			{
				question: "Can a bracelet become my personal talisman?",
				answer:
					"Yes. A talisman can simply be something that holds personal meaning for you. A bracelet made with carefully selected stones can represent an intention, a goal, a feeling or something you want to bring more of into your life. This is the idea behind Glossyplace jewellery – beautiful, elegant pieces designed to be worn and enjoyed, with an additional layer of meaning for those who choose to embrace it.",
			},
			{
				question: "How do I choose a bracelet that matches my intention?",
				answer:
					"Start by thinking about what matters to you at this moment. It might be calm, love, protection, confidence, balance, courage, positive change or prosperity. Then explore the stones used in each Glossyplace design and the meanings traditionally associated with them. Every bracelet includes a description to help you find a combination that reflects your intention – while still choosing a piece you genuinely love to wear.",
			},
		],
	},
	{
		title: "Jewellery Care",
		items: [
			{
				question: "How should I care for jewellery made with natural stones?",
				answer:
					"Glossyplace jewellery is made to be worn and enjoyed every day. Natural stones are durable, but a little care will help keep your jewellery looking beautiful. Try to avoid strong detergents, harsh chemicals, heavy impacts and drops. From time to time, you can gently wipe your jewellery with a soft cloth to help maintain its appearance.",
			},
			{
				question: "Can I wear my bracelet in water?",
				answer:
					"Yes. Occasional contact with water does not mean you need to immediately remove your bracelet. If you are on holiday and wear it in the sea or swimming pool, simply rinse it with clean water afterwards and dry it thoroughly. Keep in mind that frequent or prolonged exposure to chlorinated or salt water may gradually affect certain stones, decorative elements and the elastic.",
			},
		],
	},
	{
		title: "Orders & Delivery",
		items: [
			{
				question: "How long does it take to process my order?",
				answer:
					"Processing time depends on the product you choose. As many Glossyplace pieces are handmade after your order is placed, I need a little time to prepare each one with the care and attention it deserves. The estimated processing time will be shown on the product page and during checkout. Please remember that processing time and delivery time are two separate stages.",
			},
			{
				question: "Do you deliver outside the UK?",
				answer:
					"Yes. Glossyplace also offers delivery to selected countries outside the UK. You can check whether delivery is available to your country, along with the cost, during checkout. For international orders, local taxes, customs duties or import charges may apply depending on the regulations in the destination country.",
			},
			{
				question: "How much does delivery cost?",
				answer:
					"Delivery costs depend on the destination and the delivery option you choose. The exact cost will be displayed at checkout before you make your payment. This means you will always know the delivery cost before confirming your purchase.",
			},
			{
				question: "Can I change or cancel my order?",
				answer:
					"If you would like to change or cancel your order, please contact me as soon as possible. If I have not yet started preparing your jewellery or the order has not been dispatched, I will do my best to make the requested change. For jewellery made or customised especially for you, cancellation or return options may be limited.",
			},
		],
	},
	{
		title: "Gifts",
		items: [
			{
				question: "Is my order gift-wrapped?",
				answer:
					"Yes. I package Glossyplace jewellery beautifully and elegantly, so it is ready to be given as a gift. I want the experience of opening the package to feel just as special as the jewellery inside.",
			},
			{
				question: "Can I send a gift directly to someone?",
				answer:
					"Yes. During checkout, you can enter the recipient's address as the delivery address, allowing the gift to be sent directly to them. Please make sure you check the recipient's details carefully before confirming your order.",
			},
		],
	},
	{
		title: "Returns, Complaints & Repairs",
		items: [
			{
				question: "Can I return my jewellery?",
				answer:
					"Yes. If you change your mind, you can return your jewellery in accordance with the Glossyplace Returns Policy. The jewellery should be in suitable condition, unworn and returned following the applicable return procedure. You will find full details about return periods, how to make a return and any applicable exceptions in the Returns Policy.",
			},
			{
				question: "Can I return jewellery made to my individual requirements?",
				answer:
					"For jewellery made to your individual specifications or clearly personalised for you, the right to cancel and return may not apply. This does not affect your rights if the jewellery is faulty, damaged or not as described. You will find full details regarding made-to-order and personalised jewellery in the Glossyplace Returns Policy.",
			},
			{
				question: "What should I do if my jewellery arrives damaged?",
				answer:
					"Please contact me as soon as possible after receiving your order. Include your order number and, if possible, a photograph showing the damage. I will review the issue and offer an appropriate solution in accordance with your consumer rights and the Glossyplace policies.",
			},
		],
	},
];

export const faqHighlights: FaqItem[] = [
	{
		question: "Is Glossyplace jewellery handmade?",
		answer:
			"Yes. I create every piece of Glossyplace jewellery by hand, carefully selecting the stones, arranging each design and paying attention to every finishing detail. My jewellery is not mass-produced – each bracelet and necklace is individually made.",
	},
	{
		question: "Can a bracelet become my personal talisman?",
		answer:
			"Yes. A talisman can simply be something that holds personal meaning for you. A bracelet made with carefully selected stones can represent an intention, a goal, a feeling or something you want to bring more of into your life. This is the idea behind Glossyplace jewellery – beautiful, elegant pieces designed to be worn and enjoyed, with an additional layer of meaning for those who choose to embrace it.",
	},
	{
		question: "Which stone should I choose for love, protection, calm, confidence or prosperity?",
		answer:
			"It all depends on your intention. Rose Quartz is traditionally associated with love and emotional harmony, Black Tourmaline and Obsidian with protection, Howlite and Amethyst with calm and balance, Tiger's Eye with courage and confidence, and Citrine and Aventurine with prosperity, good fortune and positive energy.",
	},
	{
		question: "Is the jewellery made to order?",
		answer:
			"Many Glossyplace designs are created especially after an order is placed. This allows me to make the bracelet in your chosen size while preserving the individual character of every piece. Details for each design can be found on the individual product page.",
	},
	{
		question: "How long does it take to process my order?",
		answer:
			"Processing time depends on the product you choose. As many Glossyplace pieces are handmade after your order is placed, I need a little time to prepare each one with the care and attention it deserves. The estimated processing time will be shown on the product page and during checkout.",
	},
	{
		question: "Can I return my jewellery?",
		answer:
			"Yes. If you change your mind, you can return your jewellery in accordance with the Glossyplace Returns Policy. The jewellery should be in suitable condition, unworn and returned following the applicable return procedure.",
	},
];
