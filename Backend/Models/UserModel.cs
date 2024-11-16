using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using PawpalBackend.Utils;

namespace PawpalBackend.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("Username")]
        public string Username { get; set; }

        [BsonIgnore]
        public string Password { get; set; }

        [BsonElement("PasswordHash")]
        public string PasswordHash { get; set; }

        [BsonElement("PasswordSalt")]
        public string PasswordSalt { get; set; }

        public void SetPassword(string password)
        {
            PasswordHelper.CreatePasswordHash(password, out string hash, out string salt);
            PasswordHash = hash;
            PasswordSalt = salt;
        }

        public bool VerifyPassword(string password)
        {
            return PasswordHelper.VerifyPasswordHash(password, PasswordHash, PasswordSalt);
        }

        [BsonElement("FirstName")]
        public string FirstName { get; set; }

        [BsonElement("LastName")]
        public string LastName { get; set; }

        [BsonElement("Email")]
        public string Email { get; set; }

        [BsonElement("PhoneNumber")]
        public string PhoneNumber { get; set; }

    }
}
