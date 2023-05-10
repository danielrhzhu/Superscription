# Superscription

### A web app built with MERN stack and GraphQL to manage subscriptions and send SMS reminders via Twilio API.

Features:
- Beautiful user interface created using ChakraUI and React
- GraphQL at the application layey for flexable data retrieval and manipulation — powering all core features such as viewing, storing, editing and deleting subscription data
- Cron job to periodically send SMS notifications to users before renewals occur
- Secure user authentication and sessions using Redis
- Storing subscriptions in MongoDB

In progress:
- Creating automation scripts to cancel subscriptions automatically
- Integration with Bank APIs and GPT to ask for refunds if subscriptions are accidentally renewed
